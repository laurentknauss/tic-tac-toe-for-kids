# Contributing to Tic Tac Toe with OpenAI 🎮

Thank you for your interest in contributing to this project! This document provides guidelines and instructions for contributors.

## Development Setup 🚀

1. **Fork and clone the repository**
   ```bash
   git clone https://github.com/YOUR-USERNAME/tic-tac-toe.git
   cd tic-tac-toe
   ```

2. **Switch to the development branch** ⚡
   ```bash
   git checkout dev
   ```

3. **Install dependencies** 📦
   ```bash
   npm install
   ```

4. **Set up environment variables** 🔑
   - Create a `.env` file in the project root
   - Add your OpenAI API key: `VITE_OPENAI_API_KEY=your_api_key_here`

5. **Start the development server** 🏃‍♂️
   ```bash
   npm run dev
   ```

## Git Workflow 🌿

1. **Always work on the `dev` branch or feature branches based on `dev`** 🔄
   ```bash
   git checkout -b feature/your-feature-name dev
   ```

2. **Commit messages should be clear and descriptive** 📝
   - Use present tense ("Add feature" not "Added feature")
   - Use imperative mood ("Move cursor to..." not "Moves cursor to...")
   - Reference issue numbers when applicable (#123)

3. **Before submitting a PR** 🧪
   - Ensure code is formatted properly
   - Run tests: `npm test`
   - Check for TypeScript errors: `npm run typecheck`

4. **Pull Request Process** 🔀
   - Submit PRs to the `dev` branch, not `main`
   - Provide a clear description of the changes
   - Link any related issues

## Code Style Guidelines 💅

- Use TypeScript for all new code ✨
- Follow the existing project structure 🏗️
- Use functional components with hooks 🎣
- Add appropriate JSDoc comments for functions and components 📚
- Maintain strong typing (avoid using `any`) 💪

## Project Structure 📁

```
src/
├── components/     # React components 🧩
├── services/       # API and service functions 🔌
├── utils/          # Utility functions 🔧
├── types.ts        # TypeScript type definitions 📋
└── App.tsx         # Main application component 🎯
```

## Adding New Features 🌟

1. **Difficulty Levels** 🏆
   - Add new difficulty levels in `src/services/openaiService.ts`

2. **UI Enhancements** 🎨
   - Add new components in the `components` directory
   - Update styles in `App.css` or component-specific CSS files

3. **Game Logic** 🧠
   - Modify game logic in `src/utils/gameUtils.ts`

## Testing ✅

- Add unit tests for new functionality 🔎
- Test across different browsers 🌐
- Verify OpenAI API integration works correctly 🤖

## Questions? 🤔

If you have any questions or need clarification, please open an issue on GitHub or reach out to the project maintainers.

Thank you for contributing! 🙏
