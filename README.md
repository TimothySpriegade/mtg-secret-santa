# MTG Secret Santa <img src="src/assets/logo.png" alt="Logo" height="40">

A Vue 3 application for organizing Magic: The Gathering Secret Santa events with mana color assignments.
## Features

- Add and manage players for your Secret Santa event
- Assign mana colors and gift reciepient to each player
- Set minimum mana threshold for assignments
- Automatic duplicate prevention for mana assignments
- Local storage persistence for player data and settings
- Debug mode to view current state

## Project Structure
```
src/
├── components/
│   ├── DebugOutput.vue      # Debug information display
│   ├── ManaSelector.vue     # Mana color selection component
│   ├── PlayerAdder.vue      # Add new players
│   └── PlayerList.vue       # Display and manage players
├── composables/
│   ├── useLocalStorage.ts   # Local storage utilities
│   └── useManaAssignment.ts # Mana assignment logic
├── types/
│   └── player.ts            # Player type definition
├── views/
│   └── SecretSanta.vue      # Main view component
├── assets/
│   ├── vue.svg              
│   └── manaicons/           # Mana color icons
│       ├── black.png
│       ├── blue.png
│       ├── green.png
│       ├── red.png
│       └── white.png
├── App.vue                  
├── main.ts                  
└── style.css                
```