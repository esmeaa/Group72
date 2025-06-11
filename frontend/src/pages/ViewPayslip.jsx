import React from 'react';
import styles from './viewPayslip.module.css';
import { User, X } from 'lucide-react';

const paymentsMock = [
    { id: 'A8716ZJA1', info: 'Kitchen Remodel', amount: 24500 },
    { id: 'B9823XYZ', info: 'Bathroom Reno', amount: 18000 },
    { id: 'C1075QWE', info: 'Garden Patio', amount: 32000 },
];

const ViewPayslip = ({ onClose }) => {
    const total = paymentsMock.reduce((sum, p) => sum + p.amount, 0);
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
                <button className={styles.closeBtn} onClick={onClose}><X size={20} /></button>
            </div>

            <div className={styles.payments}>
                <h3>My Due Payments ({paymentsMock.length})</h3>
                {paymentsMock.map(p => (
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
};

export default ViewPayslip;
