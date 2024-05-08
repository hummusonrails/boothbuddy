# BoothBuddy

![Open Source Love](https://badges.frapsoft.com/os/v1/open-source.svg?v=103)
![Vue.js Version](https://img.shields.io/badge/vue.js-3.x-brightgreen.svg)
![Nuxt.js Version](https://img.shields.io/badge/nuxt.js-3.x-00b0f4.svg)
![Appwrite Version](https://img.shields.io/badge/appwrite-13.x-ff69b4.svg)
![Code of Conduct](https://img.shields.io/badge/code%20of%20conduct-contributor%20covenant-ff69b4.svg)
![License](https://img.shields.io/badge/license-MIT-blue.svg)

BoothBuddy is a progressive web application designed to streamline the process of analyzing vendor booths at trade shows and events. Using a combination of OpenAI, Vue.js, TailwindCSS, and Appwrite, it provides a set of tools for booth analysis, including image capture, booth analysis using AI, and detailed reporting.

## Purpose

The application aims to empower event participants to gain valuable insights into booth performance, market positioning and vendor information. It provides a user-friendly interface for capturing booth images, analyzing them using AI, and storing the results in a database. The application also provides a dashboard for managing booth data and detailed company information.

## Tech Stack

- **Vue.js**: A progressive JavaScript framework used for building user interfaces.
- **TailwindCSS**: A utility-first CSS framework for rapid UI development.
- **Appwrite**: An open-source backend server that simplifies the coding process by providing a set of development tools like Database, Authentication, Cloud Functions, and more.
- **OpenAI**: A powerful AI model that can analyze images and provide detailed information about the content.

## Getting Started

### Prerequisites

- Node.js (LTS)
- NPM or Yarn
- An Appwrite account with a project set up
- API keys for Appwrite services

### Setup

1. **Clone the repository:**

```bash
git clone https://github.com/yourusername/boothbuddy.git
cd boothbuddy
```

2. **Install dependencies:**

```bash
npm install
# or
yarn install
```

3. **Environment Variables:**

Copy the `.env.example` file to a `.env` file and fill in the details for your Appwrite project, API keys and prompt for the OpenAI API.

4. **Run the development server:**

```bash
npm run dev
# or
yarn run dev
```

Open http://localhost:3000 to view the app in your browser.

### Appwrite Services Setup

To get the full functionality of BoothBuddy, you need to set up several services within your Appwrite project:

* Database: Create collections for storing booth data.
* Storage: Set up storage for booth images.
* Functions: Deploy function for image analysis with AI.
* Authentication: Configure authentication methods for users.

Refer to the official [Appwrite documentation](https://appwrite.io/docs) for detailed instructions.

### Components

* `components/Navbar.vue`: Handles navigation and displays user authentication state.
* `components/Footer.vue`: Provides application credits and links.
* `pages/dashboard.vue`: Main interface for booth management.
* `pages/capture/new.vue`: Interface for capturing new booth images.
* `pages/company-details/[id].vue`: Displays detailed analysis and company information.
* `services/analyzeImage.js`: Function for analyzing images using AI.
* `services/boothService.js`: Service for interacting with Appwrite database and storage.
* `stores/boothStore.js`: Store for managing booth data.
* `stores/auth.js`: Store for managing user authentication.

### Code of Conduct

We adhere to a [Code of Conduct](CODE_OF_CONDUCT.md) that we expect project participants to respect. Please read the full text so that you can understand what actions will and will not be tolerated. Adherence to the Code of Conduct ensures all people are welcome to participate in contributing to BoothBuddy.

### License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
