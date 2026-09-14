export interface GameData {
  title: string;
  genre: string;
  color: string;
  image: string;
  platform?: string; // Optional since the original data doesn't have it, but we can use it if added
  description?: string;
}

export const GAMES: GameData[] = [
  { title: 'GTA V', genre: 'Open World', color: 'from-orange-900 to-yellow-900', image: '/images/games/GTAV.jpg', description: 'Explore a vast open world of crime, chaos, and freedom.' },
  { title: 'Minecraft', genre: 'Sandbox', color: 'from-green-700 to-green-900', image: '/images/games/minecraft.jpg', description: 'Build, explore, and survive in an infinite blocky universe.' },
  { title: 'Tekken 7', genre: 'Fighting', color: 'from-red-900 to-red-950', image: '/images/games/tekken7.jpg', description: 'Experience the epic conclusion of the Mishima clan feud.' },
  { title: 'FIFA 24', genre: 'Sports', color: 'from-emerald-800 to-teal-900', image: '/images/games/fc24.jpg', description: 'The most authentic football experience with ultimate team.' },
  { title: 'God Of War', genre: 'Action / RPG', color: 'from-slate-800 to-slate-900', image: '/images/games/GOD.jpg', description: 'A father and son\'s brutal journey through Norse mythology.' },
  { title: 'Call of Duty', genre: 'Shooter', color: 'from-gray-800 to-gray-900', image: '/images/games/COD.jpg', description: 'Intense multiplayer action and gripping tactical combat.' },
  { title: 'Black Ops III', genre: 'Shooter', color: 'from-orange-800 to-neutral-900', image: '/images/games/ops3.jpg', description: 'Fast-paced futuristic warfare and classic zombie survival.' },
  { title: 'MK11', genre: 'Fighting', color: 'from-yellow-800 to-red-900', image: '/images/games/mk11.jpg', description: 'Brutal, time-bending combat with a massive roster of fighters.' },
  { title: 'NBA 2K17', genre: 'Sports', color: 'from-blue-800 to-red-900', image: '/images/games/NBA17.jpg', description: 'Hit the hardwood with legendary basketball simulation.' },
  { title: 'NFS', genre: 'Racing', color: 'from-purple-900 to-pink-900', image: '/images/games/NFS.jpg', description: 'High-stakes underground racing and intense police chases.' },
  { title: 'RDR 2', genre: 'Action / Adventure', color: 'from-red-900 to-amber-900', image: '/images/games/RDR.jpg', description: 'An epic tale of life in America’s unforgiving heartland.' },
  { title: 'A Way Out', genre: 'Co-op', color: 'from-orange-800 to-yellow-800', image: '/images/games/wayout.jpg', description: 'A thrilling cooperative adventure of two inmates breaking out.' },
  { title: 'Pacify', genre: 'Horror', color: 'from-zinc-800 to-zinc-950', image: '/images/games/pacify.jpg', description: 'Navigate a haunted house and survive the terrifying girl.' },
  { title: 'Asphalt Legends', genre: 'Racing', color: 'from-blue-800 to-purple-900', image: '/images/games/asphalt.jpg', description: 'Tear up the asphalt in the ultimate arcade racing experience.' },
  { title: 'Rocket League', genre: 'Sports / Action', color: 'from-cyan-700 to-blue-900', image: '/images/games/rocket.jpg', description: 'High-octane hybrid of arcade-style soccer and vehicular mayhem.' },
  { title: 'Uncharted', genre: 'Action / Adventure', color: 'from-emerald-900 to-teal-950', image: '/images/games/uncharted.jpg', description: 'Embark on a globe-trotting journey for lost historical treasures.' },
  { title: 'Fortnite', genre: 'Battle Royale', color: 'from-purple-600 to-fuchsia-900', image: '/images/games/fortnite.jpg', description: 'Drop in, build, and survive in the ultimate battle royale.' },
  { title: 'FIFA 19', genre: 'Sports', color: 'from-slate-700 to-slate-900', image: '/images/games/fifa19.jpg', description: 'Experience the UEFA Champions League in this classic entry.' },
  { title: 'Spider-Man', genre: 'Action', color: 'from-red-700 to-blue-900', image: '/images/games/spiderman.jpg', description: 'Swing through New York City as the iconic web-slinger.' },
  { title: 'WWE 2K25', genre: 'Sports / Fighting', color: 'from-stone-800 to-stone-900', image: '/images/games/wwe25.jpg', description: 'Step into the ring and finish your story with WWE legends.' },
  { title: 'Valorant', genre: 'Tactical Shooter', color: 'from-red-600 to-red-900', image: '/images/games/valorant.jpg', description: 'Precise tactical gunplay meets unique agent abilities.' },
];
