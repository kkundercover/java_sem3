# 🤝 Donation Management System (Full Stack Java Mini Project)

> **Course Code:** 25SE3VSEC01 — Full Stack Java Programming  
> **Target Audience:** Second-Year Engineering Student (DBIT / Mumbai University Syllabus)  
> **Tech Stack:** Spring Boot 3, Spring Data JPA, MySQL 8, Java 17, React 18 (Vite), Vanilla CSS3  

---

## 📌 1. Project Directory Structure

```
mini proj-2/
│
├── backend/                                   # Spring Boot REST Backend
│   ├── pom.xml                                # Maven build file with dependencies
│   └── src/main/
│       ├── java/com/donation/management/
│       │   ├── DonationManagementApplication.java # Spring Boot entry point + sample data seeder
│       │   ├── entity/
│       │   │   ├── BaseEntity.java            # Abstract class (Inheritance & Encapsulation)
│       │   │   ├── User.java                  # Extends BaseEntity (Encapsulation, constructors)
│       │   │   ├── Campaign.java              # Extends BaseEntity (Fundraising goal tracking)
│       │   │   └── Donation.java              # Extends BaseEntity (Transaction records)
│       │   ├── repository/
│       │   │   ├── UserRepository.java        # Extends JpaRepository (Custom finder by email)
│       │   │   ├── CampaignRepository.java    # Extends JpaRepository (CRUD operations)
│       │   │   └── DonationRepository.java    # Extends JpaRepository (Donor query)
│       │   ├── exception/
│       │   │   ├── ResourceNotFoundException.java # Custom Unchecked Exception
│       │   │   ├── InvalidDonationException.java  # Custom Checked Exception ('throw' / 'throws')
│       │   │   └── GlobalExceptionHandler.java    # Centralized @RestControllerAdvice error handler
│       │   ├── worker/
│       │   │   └── ReceiptWorker.java         # Implements java.lang.Runnable (Multithreading)
│       │   └── controller/
│       │       ├── AuthController.java        # REST API: /api/auth (Login & Registration)
│       │       ├── CampaignController.java    # REST API: /api/campaigns (CRUD)
│       │       └── DonationController.java    # REST API: /api/donations (Spawns worker thread)
│       └── resources/
│           └── application.properties         # MySQL DB credentials & JPA configuration
│
└── frontend/                                  # React 18 Single Page Application (SPA)
    ├── package.json                           # Dependencies (React, React Router DOM, Vite)
    ├── vite.config.js                         # Vite dev server configuration (Port 5173)
    ├── index.html                             # Semantic HTML5 root template
    └── src/
        ├── index.css                          # Vanilla CSS3 (Flexbox, Grid, Cards, Progress bar)
        ├── main.jsx                           # ReactDOM.createRoot & BrowserRouter setup
        ├── App.jsx                            # Root component, routing (<Routes>, <Route>), session state
        └── components/
            ├── Navbar.jsx                     # Semantic <header> & <nav>, role-based links
            ├── CampaignList.jsx               # Functional component with useState, useEffect, progress bars
            ├── DonateModal.jsx                # Modal form with client-side JS regex & amount validation
            ├── Login.jsx                      # Form with validation and demo quick-fill helper
            ├── Register.jsx                   # Form with validation for DONOR / ADMIN roles
            ├── AdminDashboard.jsx             # Campaign creation form & plain HTML <table> metrics
            └── DonorDashboard.jsx             # Donor history <table> and printable receipt modal
```

---

## 🎯 2. Strict Syllabus Alignment (25SE3VSEC01)

| Syllabus Module | Concepts Covered | Implementation in Project |
| :--- | :--- | :--- |
| **Module 1.2 & 2.1: OOP & Inheritance** | Classes, Objects, Encapsulation (`private` fields, getters/setters), Constructors, Abstract Class, Inheritance (`extends`), Interface (`implements`), Method Overriding (`@Override toString()`). | `BaseEntity.java` is an abstract class inherited by `User`, `Campaign`, and `Donation`. All fields are strictly encapsulated. |
| **Module 2.2: Exception Handling** | `try`, `catch`, `finally`, `throw`, `throws`, and user-defined custom exceptions. | `ResourceNotFoundException.java` (Runtime) and `InvalidDonationException.java` (Checked). `DonationController.java` uses `throw` and declares `throws InvalidDonationException`. |
| **Module 2.3: Multithreading** | Multithreading in Java using `Runnable` / `Thread`. | `ReceiptWorker.java` implements `Runnable`. Upon donation, `DonationController` spawns `new Thread(worker).start()` to generate receipts asynchronously. |
| **Module 3.1 & 3.2: HTML5, CSS3 & JS** | Semantic tags (`<header>`, `<nav>`, `<main>`, `<table>`), CSS3 Flexbox/Grid, and client-side validation (email regex, non-negative numbers). | `DonateModal.jsx`, `Login.jsx`, `Register.jsx` feature client-side JavaScript validations with alert feedback. Styled using pure Vanilla CSS3. |
| **Module 4.1 & 6.1: Database Integration** | Connecting to MySQL database, Spring Data JPA repositories. | `application.properties` connects to MySQL (`donation_db`). `UserRepository`, `CampaignRepository`, `DonationRepository` extend `JpaRepository`. |
| **Module 5.2: React Framework** | Functional Components, Props, States (`useState`), Effects (`useEffect`), Routing (`react-router-dom`), Lists & Keys, Forms. | Entire `frontend/src/` demonstrates functional components with hooks, props passing, and declarative SPA routing. |
| **Module 6.1 & 6.2: Spring Boot REST APIs** | `@RestController`, `@RequestMapping`, `@Autowired`, `@GetMapping`, `@PostMapping`, `@PathVariable`, `@RequestBody`, `@CrossOrigin`. | `AuthController`, `CampaignController`, and `DonationController` expose clean JSON REST APIs. |

---

## 🚀 3. How to Run the Project

### Prerequisites
1. **Java JDK 17** (or above) installed.
2. **Node.js** (v18+) installed.
3. **MySQL Server** running on `localhost:3306`.

---

### Step 1: Start the Backend (Spring Boot)

1. Open `backend/src/main/resources/application.properties` and verify your MySQL password:
   ```properties
   spring.datasource.username=root
   spring.datasource.password=root    # <-- Change to your MySQL password if different
   ```

2. Open IntelliJ IDEA / Eclipse / VS Code:
   - Select **Open Project** and choose the `backend` folder.
   - Run `DonationManagementApplication.java`.
   - *Or via terminal:*
     ```powershell
     cd backend
     mvn spring-boot:run
     ```

3. When started, Spring Boot will:
   - Automatically create the database `donation_db` and tables (`users`, `campaigns`, `donations`).
   - Automatically seed default demo users and campaigns.
   - Listen on **http://localhost:8080**.

---

### Step 2: Start the Frontend (React SPA)

1. Open a new terminal in the `frontend` folder:
   ```powershell
   cd frontend
   npm install
   npm run dev
   ```

2. Open your browser and navigate to:
   ```
   http://localhost:5173
   ```

---

## 🔑 4. Demo Login Credentials (Pre-seeded)

| Role | Email | Password | Access Rights |
| :--- | :--- | :--- | :--- |
| **Administrator** | `admin@charity.org` | `admin123` | Launch new campaigns, view all campaign stats, delete campaigns |
| **Donor** | `rahul@gmail.com` | `donor123` | Browse campaigns, make live donations, view transaction history, print receipts |

*(You can also use the **Register** page to create any new Donor or Admin account!)*

---

## 🎓 5. Viva Voce Cheat-Sheet (Line-by-Line Explanation for Exam)

### Q1: Why did you use `BaseEntity` as an `abstract class`?
> **Answer:** `BaseEntity` cannot be instantiated on its own because an "entity" in isolation doesn't exist in our business logic. Only concrete entities like `User`, `Campaign`, and `Donation` exist. By declaring `BaseEntity` with `protected Long id` and `protected LocalDateTime createdAt`, we achieve **code reusability through inheritance (`extends`)**, adhering to **Module 1.2 & 2.1**.

### Q2: What is the difference between `throw` and `throws` in your code?
> **Answer:**
> - `throw` is an **action** keyword used inside a method body to actually trigger an exception object (e.g., `throw new InvalidDonationException("Amount must be > 0");`).
> - `throws` is a **declaration** keyword in the method signature warning the caller that this method might raise this checked exception (e.g., `public ResponseEntity<Donation> processDonation(...) throws InvalidDonationException`). This demonstrates **Module 2.2**.

### Q3: How is Multithreading demonstrated in this project?
> **Answer:** In `ReceiptWorker.java`, we implement `java.lang.Runnable` and override `public void run()`. When a donation is processed in `DonationController.java`, we do:
> ```java
> ReceiptWorker worker = new ReceiptWorker(...);
> Thread thread = new Thread(worker);
> thread.start();
> ```
> This executes the receipt logging/PDF preparation in a **separate background thread** (`ReceiptWorker-Txn-...`) without stalling or delaying the HTTP response returned to the donor.

### Q4: Explain the Spring Boot annotations used in your controllers.
> **Answer:**
> - `@RestController`: Marks the class as a Spring web controller and automatically converts Java return objects into JSON format (`@Controller` + `@ResponseBody`).
> - `@RequestMapping("/api/...")`: Defines the base URI endpoint path for all methods in the controller.
> - `@CrossOrigin(origins = "http://localhost:5173")`: Resolves browser CORS policy, allowing the React frontend (running on port 5173) to communicate with Spring Boot (running on port 8080).
> - `@Autowired`: Enables Spring's Inversion of Control (IoC) to automatically inject bean dependencies (like repositories) at runtime.
> - `@RequestBody`: Deserializes the incoming JSON payload from the HTTP request into a Java entity object.
> - `@PathVariable`: Extracts dynamic values from the URL path (e.g., `/api/donations/donor/{id}`).

### Q5: What React hooks are used and what do they do?
> **Answer:**
> - `useState`: Manages dynamic local component state (e.g., `const [campaigns, setCampaigns] = useState([])`). When `setCampaigns` is called, React re-renders the component with the new data.
> - `useEffect`: Handles side effects (such as fetching data from the backend via HTTP). Passing `[]` as the second argument ensures the fetch function runs once when the component is mounted.
