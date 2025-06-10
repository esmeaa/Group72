const { Pool } = require('pg');
const express = require('express');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

const db = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: 'postgres',
    database: 'user',
    port: 5432,
});

db.connect(err => {
    if (err) {
        console.error('Connection error:', err);
    } else {
        console.log('Connected to database');
    }
});

app.get('/', (req, res) => {
    res.send('Hello from the server!');
});

app.get('/api', async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM users');
        res.json(result.rows);
    } catch (err) {
        console.error('Error querying DB:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});


app.post("/api/register", async (req, res) => {
    const { firstName, lastName, username, password, role } = req.body;

    const validRoles = ["homeSeeker", "builder", "admin"];
    if (!validRoles.includes(role)) {
        return res.status(400).json({ message: "Invalid role" });
    }

    console.log("Received registration data:", req.body);

    try {
        // 🔧 Check if username already exists using correct column name
        const existingUser = await db.query(
            "SELECT * FROM users WHERE user_name = $1",
            [username]
        );

        if (existingUser.rows.length > 0) {
            return res.status(400).json({ message: "Username already exists" });
        }

        // 🔧 Insert user using correct column names
        await db.query(
            "INSERT INTO users (first_name, last_name, user_name, user_password, role) VALUES ($1, $2, $3, $4, $5)",
            [firstName, lastName, username, password, role]
        );

        res.status(200).json({ message: "Account created successfully" });
    } catch (err) {
        console.error("Error registering user:", err);
        res.status(500).json({ error: "Internal server error" });
    }
});

app.post("/api/login", async (req, res) => {
    const { username, password } = req.body;
    console.log("Received login data:", req.body);

    try {
        const result = await db.query(
            "SELECT id, first_name, last_name, user_name, role FROM users WHERE user_name = $1 AND user_password = $2",
            [username, password]
        );

        if (result.rows.length > 0) {
            const user = result.rows[0];
            res.status(200).json({
                message: "Login successful",
                user: {
                    id: user.id,
                    username: user.user_name,
                    role: user.role,
                    firstName: user.first_name,
                    lastName: user.last_name
                }
            });
        } else {
            res.status(401).json({ message: "Invalid credentials" });
        }
    } catch (err) {
        console.error("Login error:", err);
        res.status(500).json({ error: "Internal server error" });
    }
});


// GET user profile
app.get('/api/profile/:userId', async (req, res) => {
    const { userId } = req.params;
    try {
        const { rows } = await db.query(
            `SELECT * FROM user_profiles WHERE user_id = $1`,
            [userId]
        );
        if (!rows.length) return res.status(404).json({ error: "Profile not found" });
        res.json(rows[0]);
    } catch (err) {
        console.error("Error fetching profile:", err);
        res.status(500).json({ error: "Internal server error" });
    }
});

// POST or UPDATE user profile
app.post('/api/profile/:userId', async (req, res) => {
    const { userId } = req.params;
    const {
        age, sex, marital_status, kids, pets,
        religion, job_title, skills, disability, disability_details
    } = req.body;

    try {
        const result = await db.query(`
            INSERT INTO user_profiles (
                user_id, age, sex, marital_status, kids, pets,
                religion, job_title, skills, disability, disability_details
            )
            VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)
            ON CONFLICT (user_id)
            DO UPDATE SET
                age = EXCLUDED.age,
                sex = EXCLUDED.sex,
                marital_status = EXCLUDED.marital_status,
                kids = EXCLUDED.kids,
                pets = EXCLUDED.pets,
                religion = EXCLUDED.religion,
                job_title = EXCLUDED.job_title,
                skills = EXCLUDED.skills,
                disability = EXCLUDED.disability,
                disability_details = EXCLUDED.disability_details,
                updated_at = CURRENT_TIMESTAMP
            RETURNING *;
        `, [
            userId, age, sex, marital_status, kids, pets,
            religion, job_title, skills, disability, disability_details
        ]);
        res.json({ message: "Profile updated", profile: result.rows[0] });
    } catch (err) {
        console.error("Error updating profile:", err);
        res.status(500).json({ error: "Internal server error" });
    }
});


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});


