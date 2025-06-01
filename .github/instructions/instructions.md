# Instructions for AI Agent
# AI Agent Instructions
# This document outlines the instructions and guidelines for the AI agent to follow when interacting with users and analyzing code.
# It includes memory management, code analysis, and interaction protocols."

applyTo: ''**
Coding standards, domain knowledge, and preferences that AI should follow

Memory and Context Guidelines
Recall Project Structure from Memory
Before answering questions or suggesting code, first attempt to recall the project’s file and directory structure from memory.
Only request an updated structure if it is not available or is likely outdated.

Minimize Full Project Scans
Avoid scanning the entire directory unless absolutely necessary (e.g., for new or significantly changed projects).
Use stored project knowledge whenever possible.

Update Memory Incrementally
When files are added, changed, or removed, update your memory with only those specific changes instead of rescanning everything.
Track all modifications to maintain an accurate and current understanding of the project.

Contextual Awareness
When asked about specific files or parts of the project, use existing memory.
Only focus on the relevant file or its immediate context—avoid unnecessary re-analysis.

Efficient Collaboration
Always prioritize memory and existing context for fast, efficient support.
Only perform broad scans when explicitly requested or when memory is clearly outdated.

Code Analysis
Carefully analyze provided code using sequential thinking:

Break down code execution step by step.

At each step, explain what the code is doing.

If a bug exists, identify its exact location, explain why it occurs, and provide corrected code.

If no bugs are found, explain your reasoning step by step.

Avoid general improvements or speculative advice—focus only on concrete, identifiable issues.
If you need more information to diagnose a bug, clearly state what is missing.

If your training data is outdated and affects your ability to analyze the code, use the concept7 tool to retrieve updated context on relevant libraries or frameworks.

Interaction Protocol
User Identification

Assume interaction is with default_user.

If not yet identified, attempt to identify the user.

Memory Retrieval

Begin each session with "Remembering..."

Retrieve all relevant information from your memory (knowledge graph).

Memory Management

Pay attention to new information related to:

a) Identity (age, location, job title, etc.)

b) Behaviors (interests, habits)

c) Preferences (language, style)

d) Programming languages and habits

Memory Updates

For new information:

a) Create entities for recurring people, organizations, events

b) Relate them to existing entities

c) Store them as observations

Sequential Thinking

Always apply the sequential-thinking tool before fixing bugs or updating the dev branch via the commands tool.

Tavily Tool Use

If data is too outdated to answer a prompt:

a) Use Tavily to retrieve latest documentation and fixes.

b) Search in Stack Overflow, Reddit, and tech blogs.

c) If no answer is found, widen search to the entire internet.

Concept7 Tool Use

- If the code is outdated or requires context from libraries or frameworks:
a) Use the concept7 tool to retrieve updated context.
b) Analyze the code with the latest context.
- If the code is up-to-date, use existing memory and context.
- If the code is not up-to-date, use the concept7 tool to retrieve updated context.