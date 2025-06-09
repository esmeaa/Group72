import { React, useState } from 'react'
import styles from "./HomeMarket.module.css";

// Create an Action bar to use for all pages

function HomeMarket() {
  // A 'false' form that is never submitted but the values are used for filtering
  const [formData, setFormData] = useState({
    search: "",
    location: "",
    cost: 0,
    beds: 0,
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
    title: "Modern Apartment",
    desc: "Newly renovated",
    location: "Downtown",
    beds: 2,
    baths: 1,
    area: 720,
    cost: 18700,
    tags: [
      "Air Conditioning",
    ],
  }

  const listFilter = (listing) => {
    const formSearch = formData.search
    if(formSearch) {
      var used = listing.title.toLowerCase();
      if(!used.includes(formSearch.toLowerCase())) {
        return false;
      }
    }
    const formLocation = formData.location
    if(formLocation) {
      if(formLocation.toLowerCase() !== listing?.location.toLowerCase()) {
        return false;
      }
    }
    const formBeds = formData.beds
    if(formBeds && (listing.beds !== formBeds)) {
      return false;
    }
    const formCost = formData.cost;
    if(formCost && (formCost < listing.cost)) {
      return false;
    }
    return true;
  }

  // const getListings = async () => {
  //   const response = await (fetch("http://localhost:3001/api/homelistings"));
  //   const data = await response.json();
  //   return data.listings.filter(listFilter);
  // }

  const getListings = () => {
    var listings = [listing1];
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
        <p>{listings.length} Properties Available</p>
        {listings.map((listing) => {
          return (
            <div className={`${styles.holder} ${styles.listing}`}>
              <div className={styles.listing_item}>
                <h2>{listing.title}</h2>
                <div>
                  <p>R: {listing.cost}/ Month</p>
                </div>
                <div className={styles.text}>
                  <p className={styles.subtle}>{listing.location}</p>
                  <p>{listing.desc}</p>
                </div>
                <ul>
                  <p>{listing.beds} bed</p>
                  <p>{listing.bath} baths</p>
                  <p>{listing.area} Sq ft</p>
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
                <button>Contact</button>
                <button>Apply</button>
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
          <h1>Housing Listings</h1>
          <p>Find quality, affordable housing in makers valley</p>
        </div>
        <div className={`${styles.holder} ${styles.search}`}>
          <form onSubmit={handleSubmit}>
            <div>
              <p>Search and Filter Housing</p>
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
                <p>Max Price</p>
                <input 
                  type="text"
                  name="cost"
                  value={formData.cost}
                  onChange={handleChange}
                />
              </span>
              <span>
                <p>Bedrooms</p>
                <input 
                  type="text"
                  name="beds"
                  value={formData.beds}
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

export default HomeMarket;
