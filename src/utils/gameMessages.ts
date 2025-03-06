// Array of varied victory messages when player wins - adapted for French children
export const playerWinMessages = [
  "Bravo ! Tu as gagné contre l'ordinateur !",
  "Incroyable ! Tu es vraiment fort(e) à ce jeu !",
  "Champion(ne) du tic-tac-toe ! Trop cool !",
  "Tu as gagné ! Je m'entraînerai pour la prochaine fois !",
  "Victoire ! Tu es plus malin(e) que l'ordinateur !",
  "Super ! Tu mérites une médaille virtuelle ! 🏆",
  "Génial ! Tu as des talents cachés de stratège !",
  "Félicitations ! Je n'ai pas vu ton piège venir !",
  "Tu as gagné ! Peut-être que tu devrais créer des jeux vidéo plus tard !",
  "Wouah ! Je dois apprendre tes techniques !",
];

// Array of varied victory messages when AI wins
export const aiWinMessages = [
  "J'ai gagné cette fois ! On rejoue ?",
  "Youpi ! J'ai réussi ! Mais tu y étais presque !",
  "Cette manche est pour moi ! Revanche ?",
  "J'ai gagné ! Mais attention, je m'améliore à chaque partie !",
  "Victoire pour l'ordinateur ! Tu feras mieux la prochaine fois !",
  "J'ai eu de la chance cette fois-ci !",
  "Je gagne ce tour ! C'était un beau match !",
  "Gagné ! Mais tu deviens de plus en plus fort(e) !",
  "1 point pour moi ! Combien de manches veux-tu jouer ?",
  "J'ai gagné ! Tu connais d'autres jeux amusants ?",
];

// Array of draw messages
export const drawMessages = [
  "Match nul ! On est aussi forts l'un que l'autre !",
  "Égalité ! C'était un super match !",
  "Personne ne gagne cette fois ! Bien joué !",
  "Match nul ! Tu es un(e) adversaire redoutable !",
  "Égalité parfaite ! On recommence ?",
  "Ni toi ni moi ! C'était serré !",
  "Match nul ! On est tous les deux trop stratégiques !",
  "Égalité ! La prochaine partie sera décisive !",
  "Pas de gagnant ! Comme au foot, parfois !",
  "Match nul ! Tu connais l'expression 'à bon chat, bon rat' ?",
];

// Get a random message from an array
export const getRandomMessage = (messages: string[]): string => {
  const randomIndex = Math.floor(Math.random() * messages.length);
  return messages[randomIndex];
};
