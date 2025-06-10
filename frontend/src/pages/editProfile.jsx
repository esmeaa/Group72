// import React, { useState } from 'react';
// import styles from './editProfile.module.css';

// const EditProfile = () => {
//     const [formData, setFormData] = useState({
//         firstName: 'John',
//         lastName: 'Doe',
//         phone: '+27 0000 0000',
//         age: '',
//         sex: '',
//         maritalStatus: '',
//         kids: '',
//         religion: '',
//         pets: false,
//         skills: [],
//         jobTitle: '',
//         disability: false,
//         disabilityDetails: '',
//     });

//     const handleChange = e => {
//         const { name, value, type, checked } = e.target;
//         setFormData(prev => ({
//             ...prev,
//             [name]: type === 'checkbox' ? checked : value,
//         }));
//     };

//     const addSkill = () => {
//         if (formData.newSkill.trim()) {
//             setFormData(prev => ({
//                 ...prev,
//                 skills: [...prev.skills, prev.newSkill],
//                 newSkill: '',
//             }));
//         }
//     };

//     const removeSkill = (skillToRemove) => {
//         setFormData(prev => ({
//             ...prev,
//             skills: prev.skills.filter(skill => skill !== skillToRemove)
//         }));
//     };

//     const handleSubmit = e => {
//         e.preventDefault();
//         console.log("Submitting:", formData);
//         // Send to backend here
//     };

//     return (
//         <div className={styles.edit_profile_page}>
//             <h2>Edit Your Profile</h2>
//             <form onSubmit={handleSubmit} className={styles.form}>
//                 <div className={styles.field_group}>
//                     <label>First Name</label>
//                     <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} />
//                 </div>

//                 <div className={styles.field_group}>
//                     <label>Last Name</label>
//                     <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} />
//                 </div>

//                 <div className={styles.field_group}>
//                     <label>Phone</label>
//                     <input type="text" name="phone" value={formData.phone} onChange={handleChange} />
//                 </div>

//                 <div className={styles.flex_row}>
//                     <div className={styles.field_group}>
//                         <label>Age</label>
//                         <input type="number" name="age" value={formData.age} onChange={handleChange} />
//                     </div>

//                     <div className={styles.field_group}>
//                         <label>Sex</label>
//                         <select name="sex" value={formData.sex} onChange={handleChange}>
//                             <option value="">Select</option>
//                             <option>Male</option>
//                             <option>Female</option>
//                         </select>
//                     </div>

//                     <div className={styles.field_group}>
//                         <label>Marital Status</label>
//                         <select name="maritalStatus" value={formData.maritalStatus} onChange={handleChange}>
//                             <option value="">Select</option>
//                             <option>Single</option>
//                             <option>Married</option>
//                             <option>Divorced</option>
//                             <option>Widowed</option>
//                         </select>
//                     </div>
//                 </div>

//                 <div className={styles.field_group}>
//                     <label>Number of Kids</label>
//                     <input type="number" name="kids" value={formData.kids} onChange={handleChange} />
//                 </div>

//                 <div className={styles.field_group}>
//                     <label>Religion</label>
//                     <input type="text" name="religion" value={formData.religion} onChange={handleChange} />
//                 </div>

//                 <div className={styles.field_group}>
//                     <label>
//                         <input type="checkbox" name="pets" checked={formData.pets} onChange={handleChange} />
//                         Owns Pets?
//                     </label>
//                 </div>

//                 <div className={styles.field_group}>
//                     <label>Job Title</label>
//                     <input type="text" name="jobTitle" value={formData.jobTitle} onChange={handleChange} />
//                 </div>

//                 <div className={styles.field_group}>
//                     <label>Skills</label>
//                     <div className={styles.skills_input}>
//                         <input
//                             type="text"
//                             name="newSkill"
//                             value={formData.newSkill}
//                             onChange={handleChange}
//                             placeholder="Enter a skill"
//                         />
//                         <button type="button" onClick={addSkill}>Add</button>
//                     </div>
//                     <div className={styles.skills_list}>
//                         {formData.skills.map((skill, i) => (
//                             <span key={i} className={styles.skill_tag} onClick={() => removeSkill(skill)}>
//                                 {skill} ✕
//                             </span>
//                         ))}
//                     </div>
//                 </div>

//                 <div className={styles.field_group}>
//                     <label>
//                         <input
//                             type="checkbox"
//                             name="disability"
//                             checked={formData.disability}
//                             onChange={handleChange}
//                         />
//                         Do you have a disability?
//                     </label>
//                     {formData.disability && (
//                         <textarea
//                             name="disabilityDetails"
//                             value={formData.disabilityDetails}
//                             onChange={handleChange}
//                             placeholder="Please describe your disability"
//                         />
//                     )}
//                 </div>

//                 <button type="submit" className={styles.submit_btn}>Save Changes</button>
//             </form>
//         </div>
//     );
// };

// export default EditProfile;


import React, { useState, useEffect } from 'react';
import styles from './editProfile.module.css';

const EditProfile = ({ userId, onProfileUpdate }) => {
    const [formData, setFormData] = useState({
        age: '', sex: '', marital_status: '', kids: '', pets: false,
        religion: '', job_title: '', skills: [], newSkill: '',
        disability: false, disability_details: ''
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`/api/profile/${userId}`)
            .then(res => res.ok ? res.json() : null)
            .then(profile => {
                if (profile) {
                    setFormData({ ...formData, ...profile, newSkill: '' });
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
            disability_details: formData.disability ? formData.disability_details : ''
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
            <h2>Edit Your Profile</h2>
            <form onSubmit={handleSubmit} className={styles.form}>
                {/* Age / Sex / Marital Status */}
                <div className={styles.flex_row}>
                    <label>Age<input name="age" type="number" value={formData.age} onChange={handleChange} /></label>
                    <label>Sex
                        <select name="sex" value={formData.sex} onChange={handleChange}>
                            <option value="">Select</option><option>Male</option><option>Female</option><option>Other</option>
                        </select>
                    </label>
                    <label>Marital Status
                        <select name="marital_status" value={formData.marital_status} onChange={handleChange}>
                            <option value="">Select</option><option>Single</option><option>Married</option><option>Divorced</option><option>Widowed</option>
                        </select>
                    </label>
                </div>

                <label>Number of Kids<input name="kids" type="number" value={formData.kids} onChange={handleChange} /></label>
                <label>
                    <input name="pets" type="checkbox" checked={formData.pets} onChange={handleChange} />
                    Own Pets?
                </label>

                <label>Religion<input name="religion" type="text" value={formData.religion} onChange={handleChange} /></label>
                <label>Job Title<input name="job_title" type="text" value={formData.job_title} onChange={handleChange} /></label>

                <div className={styles.field_group}>
                    <label>Skills:</label>
                    <div className={styles.skills_input}>
                        <input name="newSkill" value={formData.newSkill} onChange={handleChange} placeholder="Add skill" />
                        <button type="button" onClick={addSkill}>Add</button>
                    </div>
                    <div className={styles.skills_list}>
                        {formData.skills.map(s => (
                            <span key={s} className={styles.skill_tag} onClick={() => removeSkill(s)}>{s} ✕</span>
                        ))}
                    </div>
                </div>

                <label>
                    <input name="disability" type="checkbox" checked={formData.disability} onChange={handleChange} />
                    Disability?
                </label>
                {formData.disability && (
                    <textarea name="disability_details"
                        value={formData.disability_details}
                        onChange={handleChange}
                        placeholder="Describe disability" />
                )}

                <button type="submit" className={styles.submit_btn}>Save Changes</button>
            </form>
        </div>
    );
};

export default EditProfile;
