# Implementation Plan: Donation Management System (5-Day Fast-Track)

An end-to-end full-stack engineering plan aligned strictly with the **Full Stack Java Programming (25SE3VSEC01)** syllabus and lab practical curriculum[cite: 1].

---

## 1. Technical Stack & Syllabus Compliance Mapping

| Layer | Syllabus Module / Lab Unit | Technologies & Concepts Applied |
| :--- | :--- | :--- |
| **Backend & Micro-Architecture** | Module 6.1, 6.2 & Lab 12[cite: 1] | Spring Boot, RESTful APIs, Spring Annotations (`@RestController`, `@Autowired`), Dependency Injection / IoC[cite: 1] |
| **Core Java & OOP** | Module 1.2, 2.1 & Labs 1, 2, 3[cite: 1] | Classes, Encapsulation, Method Overriding, Abstract Classes, Interfaces, `extends` Keyword[cite: 1] |
| **Robustness & Concurrency** | Module 2.2, 2.3 & Labs 3, 4[cite: 1] | Structured Exception Handling (`try-catch-finally`), User-Defined Exceptions, Multithreading (`Runnable` / `@Async`)[cite: 1] |
| **Data Persistence** | Module 4.1 & Module 6.1[cite: 1] | MySQL Database Connectivity, Spring Data JPA / Hibernate[cite: 1] |
| **Frontend Single Page App** | Module 5.2 & Lab 11[cite: 1] | React JS, React Router, Hooks (`useState`, `useEffect`), Props & State, Conditional Rendering, Lists & Keys[cite: 1] |
| **Client Scripting & Forms** | Module 3.1, 3.2 & Labs 8, 9[cite: 1] | HTML5 Forms, CSS3 Responsive Styling, JavaScript Client-Side Form Validation[cite: 1] |
| **Capstone Integration** | Lab 13 & Course Outcome CO6[cite: 1] | Complete Full Stack Solution (React + Spring Boot + MySQL)[cite: 1] |

---

## 2. System Entity-Relationship (ER) Schema
+------------------+         1:N         +-----------------------+
|      USERS       |-------------------->|       DONATIONS       |
+------------------+                     +-----------------------+
| id (PK)          |                     | id (PK)               |
| name             |                     | donor_id (FK -> USERS)|
| email (UNIQUE)   |         1:N         | campaign_id (FK)      |
| password         |---------\           | amount                |
| role             |         |           | transaction_id (UUID) |
| created_at       |         |           | created_at            |
+------------------+         |           +-----------------------+
| 1                 |                       |
|                   |                       | N:1
v N                 |                       |
+--------------------+       |                       |
|     CAMPAIGNS      |<------+-----------------------/
+--------------------+
| id (PK)            |
| title              |
| description        |
| target_amount      |
| collected_amount   |
| status             |
| created_by (FK)    |
| created_at         |
+--------------------+

---

## 3. Daily Execution Plan

### Day 1: MySQL Schema Setup, OOP Architecture & Entity Persistence
- **Objective:** Establish database connectivity and build foundational object models using Spring Data JPA[cite: 1].
- **Tasks:**
  - Create database `donation_db` in MySQL[cite: 1].
  - Generate a Spring Boot Maven project containing dependencies: `spring-boot-starter-web`, `spring-boot-starter-data-jpa`, and `mysql-connector-j`[cite: 1].
  - Configure `application.properties`:
    - `spring.datasource.url=jdbc:mysql://localhost:3306/donation_db`
    - `spring.datasource.username=root`
    - `spring.datasource.password=<your_password>`
    - `spring.jpa.hibernate.ddl-auto=update`
  - Implement OOP class inheritance:
    - Base abstract class `BaseEntity` with `id` and `createdAt` attributes[cite: 1].
    - Entity classes `User`, `Campaign`, and `Donation` extending `BaseEntity` with encapsulation, private fields, getters/setters, and constructors[cite: 1].
  - Create Spring Data JPA repositories: `UserRepository`, `CampaignRepository`, and `DonationRepository` extending `JpaRepository`[cite: 1].

---

### Day 2: Exception Handling Architecture & Core REST Endpoints
- **Objective:** Construct RESTful controllers with Dependency Injection and robust exception handling[cite: 1].
- **Tasks:**
  - Implement user-defined exception classes: `ResourceNotFoundException` and `InvalidDonationException`[cite: 1].
  - Create a `@RestControllerAdvice` class (`GlobalExceptionHandler`) utilizing `try-catch` structures to intercept runtime failures and return standard JSON error responses[cite: 1].
  - Develop `AuthController` using Spring annotations (`@RestController`, `@Autowired`)[cite: 1]:
    - `POST /api/auth/register` — Validates payload and registers new donor/admin[cite: 1].
    - `POST /api/auth/login` — Verifies credentials against MySQL and returns role details[cite: 1].
  - Develop `CampaignController` (`@RestController`, `@RequestMapping("/api/campaigns")`)[cite: 1]:
    - `GET /api/campaigns` — Returns active campaigns[cite: 1].
    - `POST /api/campaigns` — Creates a new campaign (Admin endpoint)[cite: 1].
    - `PUT /api/campaigns/{id}` — Updates campaign goal or status[cite: 1].
    - `DELETE /api/campaigns/{id}` — Removes or deactivates a campaign[cite: 1].
  - Test all endpoints and exception responses using Postman or cURL.

---

### Day 3: Donation Transaction Logic, Multithreading & Admin Analytics
- **Objective:** Implement core transactional business logic, background thread simulation, and analytics endpoints[cite: 1].
- **Tasks:**
  - Develop `DonationController` (`@RequestMapping("/api/donations")`) and service logic[cite: 1]:
    - `POST /api/donations` — Processes donation:
      - Validates campaign existence and asserts donation amount > 0[cite: 1].
      - Atomically increments campaign `collected_amount` in MySQL[cite: 1].
      - Generates a unique transaction reference and persists the record[cite: 1].
    - `GET /api/donations/donor/{donorId}` — Returns donation transaction history for a given donor[cite: 1].
  - Multithreading implementation:
    - Implement a background task using Java `Runnable` or `@Async` to simulate an asynchronous email receipt and notification dispatch worker upon donation completion[cite: 1].
    - Confirm that execution takes place in a separate thread without stalling the HTTP response thread[cite: 1].
  - Build Admin Analytics endpoint:
    - `GET /api/admin/analytics` — Aggregates metrics (total funds raised, active donors, campaign count)[cite: 1].

---

### Day 4: React Single Page Application (SPA) Setup & Dashboard UI
- **Objective:** Build client-side routing, stateful UI components, and form validation[cite: 1].
- **Tasks:**
  - Initialize the React Single Page Application (SPA) using Vite/React and configure `react-router-dom` and `axios`[cite: 1].
  - Setup React Router paths[cite: 1]:
    - `/` — Public Campaign Browser[cite: 1]
    - `/login` & `/register` — Authentication Views[cite: 1]
    - `/donor` — Donor Portal (Donation Modal, Transaction History, Receipt View)[cite: 1]
    - `/admin` — Admin Dashboard (Analytics Cards, Campaign CRUD Interface)[cite: 1]
  - Create modular functional components with React Props and State (`useState`, `useEffect`)[cite: 1]:
    - `Navbar.jsx` — Dynamic header navigation[cite: 1].
    - `CampaignCard.jsx` — Card with CSS3 progress bar showing target vs. collected funds[cite: 1].
    - `DonationModal.jsx` — Controlled donation modal component[cite: 1].
  - Implement client-side JavaScript validation[cite: 1]:
    - Email validation checking correct format and issuing an error alert if invalid (Lab 9 alignment)[cite: 1].
    - Input restrictions preventing zero or negative donation amounts[cite: 1].

---

### Day 5: Full-Stack Integration, Cross-Origin Setup & Final Demo Polish
- **Objective:** Connect React frontend to Spring Boot backend, resolve CORS, and verify end-to-end user journeys[cite: 1].
- **Tasks:**
  - Configure Cross-Origin Resource Sharing on Spring Boot controllers using `@CrossOrigin(origins = "http://localhost:5173")`[cite: 1].
  - Connect React components to backend REST endpoints using `axios`/`fetch` inside `useEffect` hooks[cite: 1]:
    - Dynamically load active campaigns on the home page[cite: 1].
    - Dispatch donation requests from modals and update progress bars in real time[cite: 1].
    - Fetch and render donor transaction tables dynamically[cite: 1].
  - Pre-seed test data in `src/main/resources/data.sql`:
    - Insert 1 Admin user, 2 Donor accounts, and 3 sample campaigns with initial amounts[cite: 1].
  - Perform end-to-end validation:
    - Donor Journey: Register -> Login -> Browse Campaigns -> Make Donation -> View Dynamic Progress Bar -> Check History -> Download/Print Receipt[cite: 1].
    - Admin Journey: Login -> View Analytics Counters -> Add New Campaign -> Modify Status[cite: 1].

---

## 4. Verification & Viva Evaluation Checklist

- [ ] **Database Connectivity:** Application boots cleanly and connects to MySQL without driver or dialect exceptions[cite: 1].
- [ ] **JPA Entities & Relationships:** Tables `users`, `campaigns`, and `donations` are auto-generated with correct foreign key relations[cite: 1].
- [ ] **Custom Exception Handling:** Passing invalid IDs or parameters triggers user-defined exceptions and returns standardized HTTP error messages[cite: 1].
- [ ] **Multithreading:** Donation transactions trigger background asynchronous receipt tasks on a separate thread[cite: 1].
- [ ] **React Hooks & SPA Routing:** Page transitions operate without browser reload; state changes update the DOM reactively[cite: 1].
- [ ] **CORS Configuration:** React UI successfully exchanges data with Spring Boot without cross-origin blocks[cite: 1].
- [ ] **Curriculum Alignment:** Implementation demonstrates requirements for Experiments 1–4, 8, 9, 11, 12, and the Lab 13 Mini Project[cite: 1].