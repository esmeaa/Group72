import React, { useState, useEffect } from 'react';
import styles from './builderDashboard.module.css';
import { Home, Bookmark, User, Settings, Edit, X } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const BuilderDashboard = () => {
  const [activeTab, setActiveTab] = useState('applications');
  const [applications, setApplications] = useState([]);
  const [payments, setPayments] = useState([]);
  const [stats, setStats] = useState({ active: 0, completed: 0, earnings: 0 });
  const [rentCredit, setRentCredit] = useState(0);
  const [viewAll, setViewAll] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  const [popup, setPopup] = useState(null);
  const navigate = useNavigate();


  const username = localStorage.getItem("username") || "Guest";
  const firstName = localStorage.getItem("firstName") || "Guest";
  const lastName = localStorage.getItem("lastName") || "Guest";

  useEffect(() => {
    // Mock data (replace with real API later)
    const mockApps = [
      { id: 'A8716ZJA', title: 'Kitchen Remodel', status: 'pending' },
      { id: 'B9823XYZ', title: 'Roof Fix', status: 'approved' },
      { id: 'C1075QWE', title: 'Wall Paint', status: 'rejected' }
    ];
    const mockPays = [
      { id: 'F13D1F3G', jobInfo: 'Kitchen Remodel', amount: 24000 },
      { id: '5FD1D46F', jobInfo: 'Roof Fix', amount: 18000 }
    ];
    setApplications(mockApps);
    setPayments(mockPays);
    setStats({
      active: mockApps.filter(a => a.status === 'pending').length,
      completed: mockApps.filter(a => a.status === 'approved').length,
      earnings: mockPays.reduce((sum, p) => sum + p.amount, 0),
    });
  }, []);

  // handleCashOut(id)
  //  This function facilitates the cashing out of credit from a user account
  const handleCashOut = (id) => {
    setPayments(prev => prev.filter(pay => pay.id !== id));
    const removed = payments.find(pay => pay.id === id);
    if (removed) {
      setStats(prev => ({ ...prev, earnings: prev.earnings - removed.amount }));
    }
    navigate('/ChatBox', { state: { draft: "I would like to cashout my due payment..." } })
  };

  const handleAddRentCredits = (id) => {
    const removed = payments.find(pay => pay.id === id);
    setPayments(prev => prev.filter(pay => pay.id !== id));
    if (removed) {
      setRentCredit(prev => prev + removed.amount);
      const content = (
      <div>
        Rent credit successfully updated!
      </div>
      )
      createPopup(content, 2)
    }
  };

  const getApplicationContent = (all = false) => {
    var list = applications.slice(0, 3);
    return (
      list.length ? (
      applications.map(app => (
        <div key={app.id} className={styles.listing_card}>
          <div className={styles.listing_info}>
            <div className={styles.listing_title}>
              <h4>{app.title}</h4>
              <span className={`${styles.price} ${styles[app.status]}`}>{app.status}</span>
            </div>
          </div>
        </div>
      ))
    ) : (
        <div className={styles.listing_card}>
          <div className={styles.listing_info}>
            <div className={styles.listing_title}>
              <h4>No Applications</h4>
            </div>
          </div>
        </div>
    ))
  }

  const getPaymentsContent = (all = false) => {
    var list = payments.slice(0, 3);;
    return (
      list.length ? (
      payments.map(pay => (
        <div key={pay.id} className={styles.listing_card}>
          <div className={styles.listing_info}>
            <div className={styles.listing_title}>
              <h4>{pay.jobInfo}</h4>
              <span className={styles.price}>R{pay.amount}</span>
            </div>
            <div className={styles.listing_status}>
              <button className={styles.pay_btn} onClick={() => handleCashOut(pay.id)}>Cash Out</button>
              <button className={styles.contact_btn} onClick={() => handleAddRentCredits(pay.id)}>Add to Rent Credit</button>
            </div>
          </div>
        </div>
      ))
    ) : (
        <div className={styles.listing_card}>
          <div className={styles.listing_info}>
            <div className={styles.listing_title}>
              <h4>No Payslips</h4>
            </div>
          </div>
        </div>
    ))
  }

  // edited from ayshas mock page
  const payslipPopup = () => {
    const total = payments.reduce((sum, p) => sum + p.amount, 0);
    const rentCredit = total; // For demo

    return (
      <div className={styles.playslip_page}>
        <div className={styles.header}>
          <div className={styles.avatar}>
            <User size={36} />
          </div>
          <div className={styles.info}>
            <h2>John Doe</h2>
            <p>Total Payout: <span>R {total.toLocaleString()}</span></p>
            <p>Rent Credit: <span>R {rentCredit.toLocaleString()}</span></p>
          </div>
          
          </div>

          <div className={styles.payments}>
          <h3>My Due Payments ({payments.length})</h3>
          {payments.map(p => (
            <div key={p.id} className={styles.paymentCard}>
              <div className={styles.textGroup}>
                <p className={styles.subtle}>Job ID: {p.id}</p>
                <p>{p.info}</p>
              </div>
              <p className={styles.amount}>R {p.amount.toLocaleString()}</p>
              <div className={styles.actions}>
                <button>Cash Out</button>
                <button>Add to Rent Credit</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const applicationsPopup = () => {
    return (
      <div className={styles.playslip_page}>
        <div className={styles.header}>
          <div className={styles.avatar}>
            <User size={36} />
          </div>
          <div className={styles.info}>
            <h2>John Doe</h2>
            <p>Active Applications: <span>R {stats.active}</span></p>
            <p>Complete Applications: <span>R {stats.completed}</span></p>
          </div>
          
          </div>

          <div className={styles.payments}>
          <h3>My Applications ({applications.length})</h3>
          {applications.map(p => (
            <div key={p.id} className={styles.paymentCard}>
              <div className={styles.textGroup}>
                <p className={styles.subtle}>Application ID: {p.id}</p>
                <p>{p.info}</p>
              </div>
              <p className={styles.amount}>Status: {p.status}</p>
              <div className={styles.actions}>
                <button>Contact</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Get a list of applications or payments
  const getListContent = (type) => {
    if(type === 'applications') return getApplicationContent();
    else if(type === 'payments') return getPaymentsContent();
  }

  // Create a popup that lasts for timeout in seconds or until closed
  const createPopup = (element, timeout = null) => {
    const popup = (
      <div className={styles.popup_holder}>
        <div className={styles.popup}>
          {!timeout && (
            <button className={styles.closeBtn} onClick={() => closePopup()}><X size={20} /></button>
          )}
          {element}
        </div>
      </div>
    )
    setPopup(popup);
    setShowPopup(true);
    if(timeout) {
      setTimeout(() => {
        closePopup();
        }, timeout * 1000); // Hide popup after 2 seconds
    }
  }

  // Remove popup
  const closePopup = () => {
    setPopup(null);
    setShowPopup(false); 
  }

  return (
    <div className={styles.builder_dash}>
      {/* Profile Section */}
      <div className={styles.profile_section}>
        <div className={styles.top_info}>
          <div className={styles.avatar_default}>
            <User size={30} />
          </div>
          <div className={styles.details}>
            <h2>{firstName} {lastName}</h2>
            <p>Builder</p>
            <p>{username}</p>
          </div>
          <button
            className={styles.edit_btn}
            onClick={() => navigate('/Profile')}
          >
            <Edit size={16} /> Edit Details
          </button>
        </div>

        {/* Stats Section */}
        <div className={styles.stats}>
          <div className={`${styles.stat} ${styles.green}`}>
            <h3>{stats.active}</h3>
            <p>Active Projects</p>
          </div>
          <div className={`${styles.stat} ${styles.pink}`}>
            <h3>{stats.completed}</h3>
            <p>Jobs Completed</p>
          </div>
          <div className={`${styles.stat} ${styles.purple}`}>
            <h3>R{stats.earnings}</h3>
            <p>Total Earnings</p>
          </div>
        </div>
      </div>

      {/* Toggle Buttons */}
      <div className={styles.toggle_section}>
        <button
          className={`${styles.toggle_tab} ${activeTab === 'applications' ? styles.active : ''}`}
          onClick={() => setActiveTab('applications')}
        >
          My Job Applications
        </button>
        <button
          className={`${styles.toggle_tab} ${activeTab === 'payments' ? styles.active : ''}`}
          onClick={() => setActiveTab('payments')}
        >
          Payslips
        </button>
      </div>

      {/* View Section */}
      <div className={styles.view_section}>
        <div className={styles.view_header}>
          <h3>{activeTab === 'applications' ? 'Applications' : 'Payslips'}</h3>
          <button onClick={() => {
            switch(activeTab) {
              case 'applications':
                createPopup((applicationsPopup()));
                break;
              case 'payments':
                createPopup((payslipPopup()));
                break;
              default:
                break;
            }
          }}>View All</button>
        </div>

        {getListContent(activeTab)}

      </div>

      {/* Bottom Navigation */}
      <div className={styles.bottom_nav}>
        <Home size={24} onClick={() => navigate('/builderDashboard')} />
        <Bookmark size={24} onClick={() => navigate('/builder/applications')} />
        <User size={24} onClick={() => navigate('/profile')} />
        <Settings size={24} onClick={() => navigate('/settings')} />
      </div>

      {showPopup && popup}

    </div>
  );
};

export default BuilderDashboard;


