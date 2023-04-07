import { IPost } from 'interfaces';
import styles from './CreateForm.module.scss';
import { useForm } from 'react-hook-form';
import { useState } from 'react';

type IProps = {
  callback(prop: IPost): void;
};

type FormValues = {
  title: string;
  category: string;
  description: string;
  date: string;
  color: string;
  license: boolean;
};

export const CreateForm = ({ callback }: IProps) => {
  const [file, setFile] = useState<string | null>(null);
  const [showMessage, setShowMessage] = useState(false);
  const [fileError, setFileError] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({ mode: 'onSubmit', reValidateMode: 'onSubmit' });

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFile(event.target.files ? URL.createObjectURL(event.target.files[0]) : null);
  };

  const showMessageFunc = () => {
    setShowMessage(true);
    setTimeout(() => {
      setShowMessage(false);
    }, 2000);
  };

  const sendData = (data: FormValues) => {
    callback({
      title: data.title,
      category: data.category,
      description: data.description,
      file: file ? file : undefined,
      color: data.color,
      date: data.date,
      key: Date.now(),
    });
  };

  const onSubmit = handleSubmit((data) => {
    showMessageFunc();
    sendData(data);
    setFile(null);
    setFileError(false);
    reset({
      title: '',
      category: '',
      description: '',
      date: '',
      color: '',
      license: false,
    });
  });

  const checkFile = () => {
    if (!file) {
      setFileError(true);
    } else {
      setFileError(false);
    }
  };

  return (
    <form
      onSubmit={(e) => {
        onSubmit(e);
        checkFile();
      }}
      className={styles.form}
    >
      <div className={styles.block}>
        <label>
          <span className={styles.label}>Post title:</span>
          <input
            type='text'
            {...register('title', {
              required: 'This field is required',
              minLength: { value: 3, message: 'The title is too short' },
            })}
          />
        </label>
        {errors.title && <div className={styles.error}>{errors.title.message}</div>}
      </div>
      <div className={styles.block}>
        <label>
          <span className={styles.label}>Post category:</span>
          <select {...register('category', { required: 'Choose category' })}>
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
        {errors.category && <div className={styles.error}>{errors.category.message}</div>}
      </div>
      <div className={styles.block}>
        <label>
          <span className={styles.label}>Description:</span>
          <textarea
            {...register('description', {
              required: 'Add description',
              minLength: { value: 3, message: 'The description is too short' },
              maxLength: { value: 100, message: 'The description is too long' },
            })}
          />
        </label>
        {errors.description && <div className={styles.error}>{errors.description.message}</div>}
      </div>
      <div className={styles.block}>
        <label>
          <span className={styles.label}>Load photo:</span>
          <label htmlFor='file' className={styles.fileButton}>
            Select
          </label>
          <input
            id='file'
            type='file'
            name='file'
            accept='image/png, image/jpeg'
            data-testid='sectionTest'
            style={{ display: 'none' }}
            onChange={handleImageUpload}
          />
        </label>
        {file && <span className={`material-icons ${styles.icon}`}>done</span>}
        {fileError && <div className={styles.error}>Add photo</div>}
      </div>
      <div className={styles.block}>
        <label>
          <span className={styles.label}>Photo&apos;s date:</span>
          <input type='date' {...register('date', { required: 'Select date' })} />
        </label>
        {errors.date && <div className={styles.error}>{errors.date.message}</div>}
      </div>
      <div className={styles.block}>
        <label>
          <span className={styles.label}>Background color</span>
          <div className={styles.colorWrapper}>
            <label htmlFor='Turquoise' className={styles.colorLabel}>
              Turquoise
            </label>
            <input
              value='Turquoise'
              id='Turquoise'
              type='radio'
              {...register('color', {
                required: 'You have to choose a color',
              })}
            />
            <label htmlFor='Salmon' className={styles.colorLabel}>
              Salmon
            </label>
            <input
              value='Salmon'
              id='Salmon'
              type='radio'
              {...register('color', {
                required: 'You have to choose a color',
              })}
            />
          </div>
        </label>
        {errors.color && <div className={styles.error}>{errors.color.message}</div>}
      </div>
      <div className={styles.block}>
        <label>
          <span className={styles.label}>I have read and agree to the license agreement:</span>
          <input
            type='checkbox'
            {...register('license', {
              required: 'Mandatory condition',
            })}
          />
        </label>
        {errors.license && <div className={styles.error}>{errors.license.message}</div>}
      </div>
      <input type='submit' value='Submit' className={styles.submit} />
      {showMessage && <div className={styles.message}>A new post has been created</div>}
    </form>
  );
};
