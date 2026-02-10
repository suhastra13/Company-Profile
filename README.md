# Wokil Tech - Corporate Web Profile 🚀

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-ORM-2d3748?style=for-the-badge&logo=prisma&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-8.0-00758F?style=for-the-badge&logo=mysql&logoColor=white)

A modern, full-stack company profile website designed for Software House & IoT Solution providers. Built with performance, SEO, and scalability in mind using the latest Next.js App Router architecture.

---

## ✨ Key Features

### 🌍 Public Facing

- **Modern UI/UX**: Responsive design with dark/light mode support, built using **Tailwind CSS** and **Shadcn UI**
- **Dynamic Portfolio**: Showcase projects with filtering, details, and gallery view fetched from the database
- **Services Section**: Detailed breakdown of services offered (Web Development, Mobile Apps, IoT Solutions)
- **Blog & News**: SEO-friendly blog section with dynamic slugs
- **Contact Form**: Real-time email notifications to Admin using **Resend** integration
- **Statistics Dashboard**: Animated counters for projects completed, clients served, and years of experience

### 🛡️ Admin Dashboard (CMS)

- **Secure Authentication**: Protected routes for admin access
- **Project Management**: Full CRUD (Create, Read, Update, Delete) operations for portfolio items
- **Content Management**: Manage services, team members, and blog posts
- **Media Management**: Upload and manage images directly to the server

---

## 🛠️ Tech Stack

| Category          | Technology                                                      |
| ----------------- | --------------------------------------------------------------- |
| **Framework**     | [Next.js 15](https://nextjs.org/) (App Router & Server Actions) |
| **Language**      | [TypeScript](https://www.typescriptlang.org/)                   |
| **Database**      | MySQL 8.0                                                       |
| **ORM**           | [Prisma](https://www.prisma.io/)                                |
| **Styling**       | Tailwind CSS, Framer Motion (Animations)                        |
| **UI Components** | Shadcn UI                                                       |
| **Form Handling** | React Hook Form + Zod Validation                                |
| **Email Service** | [Resend](https://resend.com/) + React Email                     |
| **Deployment**    | cPanel (Node.js App via Standalone Build)                       |

---

## 🚀 Getting Started

Follow these steps to run the project locally on your machine.

### Prerequisites

Ensure you have the following installed:

- **Node.js** (v18 or later)
- **MySQL Server** (XAMPP/Laragon/Docker)
- **Git**
- **npm** or **yarn** package manager

### Installation Steps

#### 1. Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/Company-Profile.git
cd Company-Profile
```

#### 2. Install Dependencies

```bash
npm install
```

Or if you prefer yarn:

```bash
yarn install
```

#### 3. Configure Environment Variables

Create a `.env` file in the root directory and add the following configuration:

```env
# Database Connection (MySQL)
DATABASE_URL="mysql://root:@localhost:3306/wokil_db"

# Email Service (Resend)
RESEND_API_KEY="re_your_api_key_here"
ADMIN_EMAIL="your_email@example.com"

# NextAuth / Security (Optional)
NEXTAUTH_SECRET="your_random_secret_string"
NEXTAUTH_URL="http://localhost:3000"
```

**Note**: Replace the placeholder values with your actual credentials.

#### 4. Setup Database

Sync your Prisma schema with your local database:

```bash
npx prisma generate
npx prisma db push
```

Optional: Seed the database with sample data

```bash
npx prisma db seed
```

#### 5. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

---

## 📂 Project Structure

```
src/
├── app/                  # Next.js App Router
│   ├── (public)/         # Public pages (Home, Portfolio, Contact, Blog)
│   ├── admin/            # Admin Dashboard pages
│   └── api/              # API Routes (Contact form, Server Actions)
├── components/           # Reusable UI Components
│   ├── home/             # Homepage specific components
│   ├── ui/               # Shadcn UI components
│   └── email/            # React Email templates
├── lib/                  # Utilities (Prisma Client, helpers)
└── prisma/               # Database Schema (schema.prisma)
```

---

## 🔧 Available Scripts

| Command             | Description                                |
| ------------------- | ------------------------------------------ |
| `npm run dev`       | Start development server on port 3000      |
| `npm run build`     | Build production-ready application         |
| `npm run start`     | Start production server                    |
| `npm run lint`      | Run ESLint to check code quality           |
| `npx prisma studio` | Open Prisma Studio for database management |

---

## ☁️ Deployment (cPanel)

This project is configured for **Standalone Output** to run efficiently on shared hosting environments.

### Deployment Steps

1. **Build the Project**

   ```bash
   npm run build
   ```

2. **Prepare Files**
   - Copy the `.next/standalone` folder
   - Copy the `public` folder
   - Copy the `.next/static` folder

3. **Upload to cPanel**
   - Upload all files to your cPanel Node.js Application directory
   - Ensure the folder structure is maintained

4. **Configure Environment Variables**
   - Create a `.env` file in cPanel with production credentials
   - Update `DATABASE_URL`, `RESEND_API_KEY`, and other variables

5. **Start the Application**
   - Navigate to the Node.js application settings in cPanel
   - Set the entry point to `server.js`
   - Click "Start Application"

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.

---

## 📧 Contact

For questions or support, please contact:

- **Email**: indrajayabta414@gmail.com

---

<div align="center">
  <p>Made with ❤️ by <strong>Indra Jasa Suhastra</strong></p>
  <p>© 2025 Wokil Tech. All rights reserved.</p>
</div>
