import { React, useState } from 'react'
import styles from "./BuilderMarket.module.css";
import { Hammer, Check, Wallet } from "lucide-react";
import { useNavigate } from "react-router-dom";
// Create an Action bar to use for all pages

function BuilderMarket() {

  const listing1 = {
    title: "Residential Renovation",
    provider: "Valley Construction",
    desc: "Complete renovation",
    location: "Downtown",
    time: "3",
    unit_time: "weeks",
    pay_low: "15000",
    pay_high: "21000",
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
    time: "3",
    unit_time: "weeks",
    pay_low: "15000",
    pay_high: "21000",
    tags: [
      "Construction",
      "Renovation",
    ],
  }

  const getListings = () => {
    var listings = [listing1, listing2];
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
          <form>
            <div>
              <p>Search and Filter jobs</p>
              <input type="text" />
              <button>Clear Filters</button>
            </div>
            <div>
              <span>
                <p>Location</p>
                <input type="text" />
              </span>
              <span>
                <p>Job Type</p>
                <input type="text" />
              </span>
              <span>
                <p>Pay Rate</p>
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

export default BuilderMarket;
