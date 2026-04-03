
## Finance_Dashboard

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 21.1.0.

## Development server
To start a local development server, run:
ng serve


## Building
To build the project run:
ng build

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Finance_Dashboard (EcData)

A sophisticated, high-performance personal finance management tool built with **Angular 21**. This project bridges economic principles with modern frontend engineering to provide a "glassmorphism" inspired interface for tracking wealth trajectory.

##  Overview

The **Finance_Dashboard** is designed to move beyond simple static tables. It treats financial data as a dynamic "wave," visualizing the real-time impact of every income and expense on the user's total budget. By leveraging **Angular Signals** for reactive state management and **Chart.js** for custom spline-curve visualizations, the app provides a premium, responsive user experience.

## Technical Approach
State Management with Signals
The project utilizes **Angular Signals** (`computed`, `effect`, `signal`) to handle real-time balance calculations. This ensures that the moment a transaction is added or deleted, the charts and balance headers update without a full page re-render.

Modern Component Design:
Standalone Architecture: Every component is standalone, reducing boilerplate and improving build times through better tree-shaking.
Control Flow Syntax: Utilizes the new @if and @for block syntax for cleaner, more performant template rendering compared to legacy structural directives.
Dynamic Theme Engine: A :root level CSS variable architecture allows for a seamless transition between Light and Dark modes without component re-renders.
