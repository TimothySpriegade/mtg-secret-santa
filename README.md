# MTG Secret Santa <img src="src/assets/logo.png" alt="Logo" height="40">

A Vue 3 application for organizing Magic: The Gathering Secret Santa events with mana color assignments and automated email notifications.

## Features

- Add and manage players for your Secret Santa event.
- Assign mana colors and a gift recipient to each player.
- Set a minimum mana threshold for assignments.
- Prevent duplicate mana color assignments automatically.
- Send assignment emails to all players using EmailJS.
- Persist player data and settings using local storage.
- Includes a debug mode to view the current application state.

## Project Structure
```
src/
src/
├── components/
│   ├── DebugOutput.vue       # Debug information display
│   ├── Header.vue            # Application header
│   ├── ManaSelector.vue      # Mana color selection component
│   ├── PlayerAdder.vue       # Component to add new players
│   ├── PlayerList.vue        # Component to display and manage players
│   └── SendMailButton.vue    # Button to trigger sending assignment emails
├── composables/
│   ├── useEmailSender.ts     # Logic for sending emails via EmailJS
│   ├── useLocalStorage.ts    # Utilities for interacting with local storage
│   └── useManaAssignment.ts  # Core logic for mana and player assignments
├── types/
│   └── player.ts             # Player type definition
├── views/
│   └── SecretSanta.vue       # Main application view
├── assets/
│   ├── logo.png
│   └── vue.svg
├── App.vue
├── main.ts
└── style.css          
```

## Setup and Usage

To run this project, you need to configure your EmailJS credentials.

1.  **Install Dependencies**
    ```bash
    npm install
    ```

2.  **Configure EmailJS**
    *   Create an account at [EmailJS](https://www.emailjs.com/).
    *   Add a new email service (e.g., Gmail).
    *   Create an email template. You must use the following variables in your template: `{{to_name}}`, `{{gift_recipient_name}}`, and `{{gift_recipient_colors}}`.
    *   Create a `.env` file in the project root and add your EmailJS credentials:
        ```
        VITE_EMAILJS_SERVICE_ID=your_service_id
        VITE_EMAILJS_TEMPLATE_ID=your_template_id
        VITE_EMAILJS_PUBLIC_KEY=your_public_key
        ```

3.  **Run the Application**
    ```bash
    npm run dev
    ```

4.  **How to Use**
    *   Add players using the input form.
    *   Use the "Assign Mana & Players" button to create the secret santa assignments.
    *   Click "Send Assignments" to email each player their assigned recipient and mana colors.

## Example Template

Here is an example of how your EmailJS template might look:
```
Hi {{to_name}},

🎄 You've been assigned as a gift giver in our MTG Secret Santa exchange! 🎁

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

YOUR ASSIGNMENT:

🎯 Gift Recipient: {{gift_recipient_name}}
🎨 Assigned Mana Colors: {{gift_recipient_colors}}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📋 DECK SECRET SANTA RULES:

💰 Budget: up to €50
📊 Average card price: up to €2
⭐ Up to one expensive card (max €20)
✨ Don't forget the 3 staples (if necessary)
📦 No obligation to order—check your bulk first!
🏞️ Minimum 35 lands
🎯 Deck should have a coherent strategy/theme
📦 Deck box and sleeves are NOT part of the budget

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Have fun brewing! 🧙‍♂️✨
```

