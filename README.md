## TECH STACK USED:
Frontend: Vite-react
Backend: Express Nodejs
Database: MONGODB

## BACKEND SETUP COMMANDS
# 1. Create project structure
mkdir mini-linkedin
cd mini-linkedin
mkdir backend
cd backend

# 2. Initialize Node.js project
npm init -y

# 3. Install backend dependencies
npm install express mongoose bcryptjs jsonwebtoken cors dotenv helmet morgan express-rate-limit express-validator

# 4. Install development dependencies
npm install -D nodemon concurrently

# 5. Create folder structure
mkdir config controllers middleware models routes utils

# 6. Deploy backend to Vercel (after creating all files)
npm i -g vercel
vercel --prod


## FRONTEND SETUP COMMANDS
# 1. Go back to root and create frontend
cd ..
npm create vite@latest frontend -- --template react
cd frontend

# 2. Install frontend dependencies
npm install react-router-dom axios react-hook-form @hookform/resolvers yup react-hot-toast date-fns

# 3. Install UI/Styling dependencies
npm install tailwindcss @tailwindcss/forms @tailwindcss/typography autoprefixer postcss lucide-react

# 4. Install development dependencies
npm install -D @types/node

# 5. Initialize Tailwind CSS
npx tailwindcss init -p

# 6. Create folder structure
mkdir -p src/components/common src/components/auth src/components/posts src/components/profile
mkdir -p src/pages src/context src/utils src/hooks

# 7. Deploy frontend to Vercel (after updating .env.production with backend URL)
vercel --prod
