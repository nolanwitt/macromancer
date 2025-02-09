# Macromancer README

## Overview

Macromancer is an AI-powered nutrition guide designed to help users track the nutritional value of their meals in a simple and engaging way. By uploading meal photos and providing basic information (height, weight, and age), users can receive detailed nutritional breakdowns, including calorie counts, macronutrients, and personalized meal suggestions. Unlike traditional nutrition apps that rely on structured food databases, Macromancer uses advanced AI to analyze home-cooked meals, food bank donations, and other unstructured food sources.

This guide will walk you through the steps to set up and run Macromancer locally for development.

## Prerequisites

Before you begin, ensure that you have the following installed on your local machine:

1. **Node.js (v14 or higher)**: This is necessary to run both the backend and frontend of the application.
   - You can download Node.js from [here](https://nodejs.org/).

2. **npm (v6 or higher)**: npm comes with Node.js, but ensure that you have the latest version for compatibility with various dependencies.
   - You can check your npm version by running `npm -v` in your terminal.

3. **Git**: Ensure you have Git installed to clone the repository.
   - You can download Git from [here](https://git-scm.com/).

4. **OpenAI API Key**: You will need an OpenAI API key to access the GPT-4 Mini functionality. You can get it from [OpenAI's website](https://platform.openai.com/).

## Setting Up the Application

1. **Clone the Repository**

   First, clone the repository to your local machine:

   ```bash
   git clone https://github.com/your-username/macromancer.git
   cd macromancer
