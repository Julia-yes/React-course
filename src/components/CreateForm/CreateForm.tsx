import { IPost } from 'interfaces';
import React from 'react';
import styles from './CreateForm.module.scss';

type Props = {
  callback(prop: IPost): void;
  closeForm(): void;
};

export class CreateForm extends React.Component<
  Props,
  {
    isDate: boolean;
    file: string | undefined;
    titleError: boolean;
    fileError: boolean;
    dateError: boolean;
    saveData: boolean;
  }
> {
  private category: React.RefObject<HTMLSelectElement>;
  private title: React.RefObject<HTMLInputElement>;
  private checkbox: React.RefObject<HTMLInputElement>;
  private color1: React.RefObject<HTMLInputElement>;
  private color2: React.RefObject<HTMLInputElement>;
  private date: React.RefObject<HTMLInputElement>;
  private file: React.RefObject<HTMLInputElement>;
  private description: React.RefObject<HTMLTextAreaElement>;
  constructor(props: Props) {
    super(props);
    this.state = {
      isDate: false,
      file: undefined,
      titleError: false,
      fileError: false,
      dateError: false,
      saveData: false,
    };
    this.category = React.createRef();
    this.title = React.createRef();
    this.description = React.createRef();
    this.checkbox = React.createRef();
    this.date = React.createRef();
    this.file = React.createRef();
    this.color1 = React.createRef();
    this.color2 = React.createRef();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.deleteMessage = this.deleteMessage.bind(this);
    this.showMessage = this.showMessage.bind(this);
    this.sendData = this.sendData.bind(this);
    this.clearForm = this.clearForm.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.validateForm = this.validateForm.bind(this);
    this.handleImageUpload = this.handleImageUpload.bind(this);
    this.changeIsDate = this.changeIsDate.bind(this);
  }

  changeIsDate() {
    this.setState({
      isDate: !this.state.isDate,
    });
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
      this.props.closeForm();
    }, 2000);
  }

  sendData() {
    this.props.callback({
      title: this.title.current?.value,
      category: this.category.current?.value,
      description: this.description.current?.value,
      isDate: this.checkbox.current?.checked,
      file: this.state.file,
      color: this.color1.current?.checked
        ? this.color1.current.value
        : this.color2.current?.checked
        ? this.color2.current.value
        : undefined,
      date: this.date.current?.value ? this.date.current?.value : undefined,
    });
  }

  clearForm() {}

  saveData() {
    if (!this.state.fileError && !this.state.titleError && !this.state.dateError) {
      this.showMessage();
      this.sendData();
      this.clearForm();
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
    if (
      (this.state.isDate && !this.date.current?.value) ||
      (this.state.isDate && this.date.current?.value && this.date.current?.value.length < 1)
    ) {
      this.setState({
        dateError: true,
      });
    } else {
      this.setState({
        dateError: false,
      });
    }
  }

  async handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await this.validateForm();
    await this.saveData();
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
        <label>
          <span className={styles.label}>Post category:</span>
          <select ref={this.category}>
            <option value='Work' defaultChecked>
              Work
            </option>
            <option value='Hobby'>Hobby</option>
            <option value='Vacation'>Vacation</option>
            <option value='Life'>Life</option>
            <option value='Family'>Family</option>
            <option value='Children'>Children</option>
            <option value='Pets'>Pets</option>
          </select>
        </label>
        <label>
          <span className={styles.label}>Description:</span>
          <textarea ref={this.description} />
        </label>
        <div className={styles.block}>
          <label>
            <span className={styles.label}>Load foto:</span>
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
          {this.state.fileError && <div className={styles.error}>Select image</div>}
        </div>
        <label>
          <span className={styles.label}>Show date of the photo:</span>
          <input type='checkbox' ref={this.checkbox} onChange={this.changeIsDate} />
        </label>
        {this.state.isDate && (
          <div className={styles.block}>
            <label>
              <span className={styles.label}>Photo&apos;s date:</span>
              <input type='date' ref={this.date} />
            </label>
            {this.state.dateError && <div className={styles.error}>Select date</div>}
          </div>
        )}
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
        <input type='submit' value='Submit' className={styles.submit} />
        {this.state.saveData && <div className={styles.message}>A new post has been created</div>}
      </form>
    );
  }
}
