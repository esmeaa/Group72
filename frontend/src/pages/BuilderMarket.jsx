import { React, useState } from 'react'
import styles from "./BuilderMarket.module.css";
// Create an Action bar to use for all pages

function BuilderMarket() {
  // A 'false' form that is never submitted but the values are used for filtering
  const [formData, setFormData] = useState({
    search: "",
    location: "",
    tag: "",
    pay: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const listing1 = {
    title: "Residential Renovation",
    provider: "Valley Construction",
    desc: "Complete renovation",
    location: "Downtown",
    time: 3,
    unit_time: "weeks",
    pay_low: 15000,
    pay_high: 21000,
    tags: [
      "Construction",
      "Renovation",
    ],
  }

  const listing2 = {
    title: "Residential Renovation",
    provider: "Valley Construction",
    desc: "Complete renovation",
    location: "Downtown",
    time: 3,
    unit_time: "weeks",
    pay_low: 15000,
    pay_high: 21000,
    tags: [
      "Construction",
      "Renovation",
    ],
  }

  const listFilter = (listing) => {
    if(formData.search) {
      var used = listing?.title.toLowerCase();
      if(!used.includes(formData.search.toLowerCase())) {
        return false;
      }
    }
    if(formData.location) {
      if(formData.location.toLowerCase() !== listing?.location.toLowerCase()) {
        return false;
      }
    }
    if(formData.tag) {
      var search_tag = formData.tag.replace(/^./, char => char.toUpperCase());
      if(!listing?.tags.includes(search_tag)) {
        return false;
      }
    }
    const formPay = formData.pay;
    if(formPay) {
      if(listing?.pay_low > formPay || formPay > listing?.pay_high) {
        return false;
      }
    }
    return true;
  }

  // const getListings = async () => {
  //   const response = await (fetch("http://localhost:3001/api/joblistings"));
  //   const data = await response.json();
  //   return data.listings.filter(listFilter);
  // }

  const getListings = () => {
    var listings = [listing1, listing2];
    return listings.filter(listFilter);
  }
  
  const getListingsContent = () => {
    //const listings = await getListings();
    const listings = getListings();
    if(!listings.length) {
      return (
        <div>
          <p>No listings</p>
        </div>
      )
    }
    return (
      <div>
        <p>{listings.length} Jobs Available</p>
        {listings.map((listing) => {
          return (
            <div className={`${styles.holder} ${styles.listing}`}>
              <div className={styles.listing_item}>
                <h2>{listing.title}</h2>
                <div className={styles.text}>
                  <p className={styles.subtle}>{listing.provider}</p>
                  <p>{listing.desc}</p>
                  <p>{listing.type}</p>
                </div>
                <ul>
                  <p>{listing.location}</p>
                  <p>{listing.time} {listing.unit_time}</p>
                  <p>{listing.pay_low}-{listing.pay_high}</p>
                </ul>
              </div>
              {listing.tags.map((tag) => {
                return (
                  <div>
                    <p>{tag}</p>
                  </div>
                )
              })}
              <div className={`${styles.button} ${styles.listing_item}`}>
                <button>Apply Now</button>
              </div>
            </div>
          )
        })}
      </div>
    )
  }

  return (
    <div className={styles.builder_dash}>
      <div className={styles.builder_inner}>
        <div className={styles.holder}>
          <h1>Job Listings</h1>
          <p>Find construction and community development jobs in makers valley</p>
        </div>
        <div className={`${styles.holder} ${styles.search}`}>
          <form onSubmit={handleSubmit}>
            <div>
              <p>Search and Filter jobs</p>
                <input 
                  type="text"
                  name="search"
                  value={formData.search}
                  onChange={handleChange}
                />
              <button>Clear Filters</button>
            </div>
            <div>
              <span>
                <p>Location</p>
                <input 
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                />
              </span>
              <span>
                <p>Job Type</p>
                <input 
                  type="text"
                  name="tag"
                  value={formData.tag}
                  onChange={handleChange}
                />
              </span>
              <span>
                <p>Pay Rate</p>
                <input 
                  type="text"
                  name="pay"
                  value={formData.pay}
                  onChange={handleChange}
                />
              </span>
            </div>
          </form>
        </div>
        <div classname={styles.listings_holder}>
          {getListingsContent()}
        </div>
      </div>
    </div>
  )
}

export default BuilderMarket;
