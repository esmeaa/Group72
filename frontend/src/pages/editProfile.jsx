
import React, { useState, useEffect } from 'react';
import styles from './editProfile.module.css';
import useLocalStorage from 'use-local-storage';

const EditProfile = ({ userId, onProfileUpdate }) => {
  const init_theme = 'light';
  const [theme, setTheme] = useLocalStorage('theme', init_theme);

  const changeTheme = (e) => {
    handleChange(e);
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  }

  const [formData, setFormData] = useState({
    age: '',
    sex: '',
    marital_status: '',
    kids: '',
    pets: false,
    religion: '',
    job_title: '',
    skills: [],
    newSkill: '',
    disability: false,
    disability_details: '',
    accessibility: false,
    fontsize: '',
    language: '',
    darkmode: theme,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/profile/${userId}`)
      .then(res => res.ok ? res.json() : null)
      .then(profile => {
        if (profile) {
          setFormData(prev => ({ ...prev, ...profile, newSkill: '' }));
        }
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [userId]);

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const addSkill = () => {
    const s = formData.newSkill.trim();
    if (s) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, s],
        newSkill: ''
      }));
    }
  };

  const removeSkill = skill => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s !== skill)
    }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    const payload = {
      age: formData.age || null,
      sex: formData.sex,
      marital_status: formData.marital_status,
      kids: formData.kids || null,
      pets: formData.pets,
      religion: formData.religion,
      job_title: formData.job_title,
      skills: formData.skills,
      disability: formData.disability,
      disability_details: formData.disability ? formData.disability_details : '',
      accessibility: formData.accessibility || false,
      fontsize: formData.fontsize,
      language: formData.language,
      darkmode: formData.darkmode,
    };

    fetch(`/api/profile/${userId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
      .then(res => res.ok ? res.json() : Promise.reject(res))
      .then(data => {
        alert('Profile saved!');
        onProfileUpdate(data.profile);
      })
      .catch(err => {
        console.error('Save error:', err);
        alert('Error saving profile');
      });
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className={styles.edit_profile_page}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h2 className={styles.heading}>Edit Your Profile</h2>

        <div className={styles.flex_row}>
          <label>
            Age
            <input name="age" type="number" value={formData.age} onChange={handleChange} />
          </label>
          <label>
            Sex
            <select name="sex" value={formData.sex} onChange={handleChange}>
              <option value="">Select</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
          </label>
          <label>
            Marital Status
            <select name="marital_status" value={formData.marital_status} onChange={handleChange}>
              <option value="">Select</option>
              <option>Single</option>
              <option>Married</option>
              <option>Divorced</option>
              <option>Widowed</option>
            </select>
          </label>
        </div>

        <div className={styles.full_field}>
          <label className={styles.label}>Number of Kids</label>
          <input name="kids" type="number" value={formData.kids} onChange={handleChange} />
        </div>

        <div className={styles.full_field}>
          <label className={styles.label}>Religion</label>
          <input name="religion" type="text" value={formData.religion} onChange={handleChange} />
        </div>

        <div className={styles.full_field}>
          <label className={styles.label}>Job Title</label>
          <input name="job_title" type="text" value={formData.job_title} onChange={handleChange} />
        </div>

        <div className={styles.full_field}>
          <label className={styles.label}>Skills:</label>
          <div className={styles.skills_input}>
            <input
              name="newSkill"
              value={formData.newSkill}
              onChange={handleChange}
              placeholder="Add skill"
              className={styles.full_input}
            />
            <button type="button" className={styles.add_btn} onClick={addSkill}>Add</button>
          </div>
          <div className={styles.skills_list}>
            {formData.skills.map(s => (
              <span key={s} className={styles.skill_tag} onClick={() => removeSkill(s)}>{s} ✕</span>
            ))}
          </div>
        </div>

        <label className={styles.checkbox_label}>
          <input
            name="disability"
            type="checkbox"
            checked={formData.disability}
            onChange={handleChange}
          />
          Disability?
        </label>

        {formData.disability && (
          <textarea
            name="disability_details"
            value={formData.disability_details}
            onChange={handleChange}
            placeholder="Please describe your disability"
          />
        )}

        <label className={styles.checkbox_label}>
          <input
            name="pets"
            type="checkbox"
            checked={formData.pets}
            onChange={handleChange}
          />
          Own Pets?
        </label>

        <label className={styles.checkbox_label}>
          <input
            name="accessibility"
            type="checkbox"
            checked={formData.accessibility}
            onChange={handleChange}
          />
          Enable Accessibility Options
        </label>

        {formData.accessibility && (
          <div>
            <div className={styles.full_field}>
              <label className={styles.label}>Font Size:</label>
              <select name="fontsize" value={formData.fontsize} onChange={handleChange}>
                <option value="">Select</option>
                <option value="10">Small</option>
                <option value="11">Normal</option>
                <option value="12">large</option>
                <option value="14">Extra large</option>
              </select>
            </div>
            <div className={styles.full_field}>
              <label className={styles.label}>Preferred Language:</label>
              <select name="language" value={formData.language} onChange={handleChange}>
                <option value="">Select</option>
                <option value="eng">English</option>
                <option value="zlu">isiZulu</option>
              </select>
            </div>
            <label className={styles.checkbox_label}>
              <input
                name="darkmode"
                type="checkbox"
                checked={formData.darkmode}
                onChange={changeTheme}
              />
              Enable Darkmode
            </label>
          </div>
        )}

        <button type="submit" className={styles.submit_btn}>Save Changes</button>
      </form>
    </div>
  );
};

export default EditProfile;
