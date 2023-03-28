import { IPost } from 'interfaces';
import React from 'react';
import styles from './CreateForm.module.scss';

type Props = {
  callback(prop: IPost): void;
};

export class CreateForm extends React.Component<
  Props,
  {
    checkboxError: boolean;
    file: string | undefined;
    titleError: boolean;
    fileError: boolean;
    dateError: boolean;
    colorError: boolean;
    descriptionError: boolean;
    categoryError: boolean;
    saveData: boolean;
  }
> {
  private category: React.RefObject<HTMLSelectElement>;
  private title: React.RefObject<HTMLInputElement>;
  private color1: React.RefObject<HTMLInputElement>;
  private color2: React.RefObject<HTMLInputElement>;
  private date: React.RefObject<HTMLInputElement>;
  private checkbox: React.RefObject<HTMLInputElement>;
  private file: React.RefObject<HTMLInputElement>;
  private description: React.RefObject<HTMLTextAreaElement>;
  constructor(props: Props) {
    super(props);
    this.state = {
      file: undefined,
      titleError: false,
      fileError: false,
      dateError: false,
      colorError: false,
      descriptionError: false,
      checkboxError: false,
      categoryError: false,
      saveData: false,
    };
    this.category = React.createRef();
    this.title = React.createRef();
    this.description = React.createRef();
    this.date = React.createRef();
    this.checkbox = React.createRef();
    this.file = React.createRef();
    this.color1 = React.createRef();
    this.color2 = React.createRef();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.deleteMessage = this.deleteMessage.bind(this);
    this.showMessage = this.showMessage.bind(this);
    this.clearForm = this.clearForm.bind(this);
    this.sendData = this.sendData.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.validateForm = this.validateForm.bind(this);
    this.handleImageUpload = this.handleImageUpload.bind(this);
  }

  handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      file:
        event.target.files && event.target.files[0]
          ? URL.createObjectURL(event.target.files[0])
          : undefined,
    });
  };

  deleteMessage() {
    this.setState({
      saveData: false,
    });
  }

  showMessage() {
    this.setState({
      saveData: true,
    });
    setTimeout(() => {
      this.deleteMessage();
    }, 2000);
  }

  sendData() {
    this.props.callback({
      title: this.title.current?.value,
      category: this.category.current?.value,
      description: this.description.current?.value,
      file: this.state.file,
      color: this.color1.current?.checked
        ? this.color1.current.value
        : this.color2.current?.checked
        ? this.color2.current.value
        : undefined,
      date: this.date.current?.value ? this.date.current?.value : undefined,
      key: Date.now(),
    });
  }

  saveData() {
    if (
      !this.state.fileError &&
      !this.state.titleError &&
      !this.state.dateError &&
      !this.state.descriptionError &&
      !this.state.categoryError &&
      !this.state.checkboxError &&
      !this.state.colorError
    ) {
      this.showMessage();
      this.sendData();
    }
  }

  validateForm() {
    if (!this.title.current?.value.length || this.title.current?.value.length < 3) {
      this.setState({
        titleError: true,
      });
    } else {
      this.setState({
        titleError: false,
      });
    }
    if (!this.state.file) {
      this.setState({
        fileError: true,
      });
    } else {
      this.setState({
        fileError: false,
      });
    }
    if (!this.description.current?.value) {
      this.setState({
        descriptionError: true,
      });
    } else {
      this.setState({
        descriptionError: false,
      });
    }
    if (!this.category.current?.value) {
      this.setState({
        categoryError: true,
      });
    } else {
      this.setState({
        categoryError: false,
      });
    }
    if (!this.color1.current?.checked && !this.color2.current?.checked) {
      this.setState({
        colorError: true,
      });
    } else {
      this.setState({
        colorError: false,
      });
    }
    if (!this.date.current?.value) {
      this.setState({
        dateError: true,
      });
    } else {
      this.setState({
        dateError: false,
      });
    }
    if (!this.checkbox.current?.checked) {
      this.setState({
        checkboxError: true,
      });
    } else {
      this.setState({
        checkboxError: false,
      });
    }
  }

  clearForm() {
    this.setState({
      file: undefined,
    });
  }

  async handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await this.validateForm();
    await this.saveData();
    if (
      !this.state.fileError &&
      !this.state.titleError &&
      !this.state.dateError &&
      !this.state.descriptionError &&
      !this.state.categoryError &&
      !this.state.checkboxError &&
      !this.state.colorError
    ) {
      await (e.target as HTMLFormElement).reset();
      await this.clearForm();
    }
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} className={styles.form}>
        <div className={styles.block}>
          <label>
            <span className={styles.label}>Post title:</span>
            <input type='text' ref={this.title} />
          </label>
          {this.state.titleError && <div className={styles.error}>The title is too short</div>}
        </div>
        <div className={styles.block}>
          <label>
            <span className={styles.label}>Post category:</span>
            <select ref={this.category}>
              <option value=''>--Choose category--</option>
              <option value='Work'>Work</option>
              <option value='Hobby'>Hobby</option>
              <option value='Vacation'>Vacation</option>
              <option value='Life'>Life</option>
              <option value='Family'>Family</option>
              <option value='Children'>Children</option>
              <option value='Pets'>Pets</option>
            </select>
          </label>
          {this.state.categoryError && <div className={styles.error}>Choose category</div>}
        </div>

        <div className={styles.block}>
          <label>
            <span className={styles.label}>Description:</span>
            <textarea ref={this.description} />
          </label>
          {this.state.descriptionError && <div className={styles.error}>Add description</div>}
        </div>
        <div className={styles.block}>
          <label>
            <span className={styles.label}>Load photo:</span>
            <label htmlFor='file' className={styles.fileButton}>
              Select
            </label>
            <input
              ref={this.file}
              id='file'
              type='file'
              accept='image/png, image/jpeg'
              style={{ display: 'none' }}
              onChange={this.handleImageUpload}
            />
          </label>
          {this.state.file && <span className={`material-icons ${styles.icon}`}>done</span>}
          {this.state.fileError && <div className={styles.error}>Select image</div>}
        </div>
        <div className={styles.block}>
          <label>
            <span className={styles.label}>Photo&apos;s date:</span>
            <input type='date' ref={this.date} />
          </label>
          {this.state.dateError && <div className={styles.error}>Select date</div>}
        </div>
        <div className={styles.block}>
          <label>
            <span className={styles.label}>Background color</span>
            <div className={styles.colorWrapper}>
              <label htmlFor='Turquoise' className={styles.colorLabel}>
                Turquoise
              </label>
              <input name='color' value='Turquoise' id='Turquoise' type='radio' ref={this.color1} />
              <label htmlFor='Salmon' className={styles.colorLabel}>
                Salmon
              </label>
              <input name='color' value='Salmon' id='Salmon' type='radio' ref={this.color2} />
            </div>
          </label>
          {this.state.colorError && <div className={styles.error}>You have to choose a color</div>}
        </div>
        <div className={styles.block}>
          <label>
            <span className={styles.label}>I have read and agree to the license agreement:</span>
            <input type='checkbox' ref={this.checkbox} />
          </label>
          {this.state.checkboxError && <div className={styles.error}>Mandatory condition</div>}
        </div>
        <input type='submit' value='Submit' className={styles.submit} />
        {this.state.saveData && <div className={styles.message}>A new post has been created</div>}
      </form>
    );
  }
}
