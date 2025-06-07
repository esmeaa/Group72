import { React, useState } from 'react'
import styles from "./HomeMarket.module.css";
import { Hammer, Check, Wallet } from "lucide-react";
import { useNavigate } from "react-router-dom";
// Create an Action bar to use for all pages

function HomeMarket() {

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

  const getListings = () => {
    var listings = [listing1];
    return listings;
  }
  
  const getListingsContent = () => {
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
          <form>
            <div>
              <p>Search and Filter Housing</p>
              <input type="text" />
              <button>Clear Filters</button>
            </div>
            <div>
              <span>
                <p>Location</p>
                <input type="text" />
              </span>
              <span>
                <p>Price Range</p>
                <input type="text" />
              </span>
              <span>
                <p>Bedrooms</p>
                <input type="text" />
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
