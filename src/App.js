// ============================================================
// LE KEÏSEN NIGHT — App principale
// Ce fichier connecte la boutique et le tableau de bord admin
//
// UTILISATION :
// - Site normal → https://ton-site.com
// - Admin → https://ton-site.com?admin
// - Mot de passe admin : keisen2026
// ============================================================

import { useState, useEffect } from "react";

// ─── DONNÉES PARTAGÉES ──────────────────────────────────────
const ADMIN_PASSWORD = "keisen2026";

const ALL_PRODUCTS = [
{ id: 1, name: "IPA Sauvage", category: "biere", type: "IPA", deg: "6.5°", price: 3.90, desc: "Houblons américains, notes d'agrumes et de résine", emoji: "🍺", stock: 24, active: true },
{ id: 2, name: "Stout Noire", category: "biere", type: "Stout", deg: "7.2°", price: 4.50, desc: "Café torréfié, chocolat noir, corps velouté", emoji: "🍺", stock: 18, active: true },
{ id: 3, name: "Blonde Dorée", category: "biere", type: "Blonde", deg: "5.0°", price: 2.80, desc: "Légère et rafraîchissante, parfaite pour l'été", emoji: "🍺", stock: 36, active: true },
{ id: 4, name: "Triple Abbaye", category: "biere", type: "Triple", deg: "9.0°", price: 5.20, desc: "Complexe, épicée, fermentation haute traditionnelle", emoji: "🍺", stock: 12, active: true },
{ id: 9, name: "Bière Blanche Belge", category: "biere", type: "Blanche", deg: "4.8°", price: 3.20, desc: "Coriandre, écorce d'orange, légèreté estivale", emoji: "🍺", stock: 30, active: true },
{ id: 5, name: "Whisky Single Malt 12 ans", category: "alcool", type: "Whisky", deg: "43°", price: 54.90, desc: "Tourbé, vanille, miel, fût de chêne américain", emoji: "🥃", stock: 8, active: true },
{ id: 6, name: "Gin Botanique No.7", category: "alcool", type: "Gin", deg: "42°", price: 38.00, desc: "7 botaniques, genévrier, lavande, poivre rose", emoji: "🍸", stock: 10, active: true },
{ id: 7, name: "Rhum Agricole AOC", category: "alcool", type: "Rhum", deg: "50°", price: 42.00, desc: "Canne à sucre fraîche, terroir martiniquais", emoji: "🥃", stock: 15, active: true },
{ id: 8, name: "Vodka Artisanale", category: "alcool", type: "Vodka", deg: "40°", price: 29.90, desc: "Triple distillée, filtration sur charbon de bouleau", emoji: "🍸", stock: 20, active: true },
{ id: 10, name: "Cognac VSOP", category: "alcool", type: "Cognac", deg: "40°", price: 68.00, desc: "4 ans minimum, fruits secs, épices douces", emoji: "🥃", stock: 6, active: true },
{ id: 25, name: "Rosé Provence AOP", category: "vin", type: "Rosé", deg: "13°", price: 14.90, desc: "Pâle et élégant, notes de fruits rouges, frais et léger", emoji: "🥂", stock: 20, active: true },
{ id: 26, name: "Rosé Grande Réserve", category: "vin", type: "Rosé", deg: "13.5°",price: 18.50, desc: "Grenache & Syrah, bouquet floral, finale persistante", emoji: "🥂", stock: 15, active: true },
{ id: 27, name: "Blanc Sauvignon sec", category: "vin", type: "Blanc", deg: "12.5°",price: 13.90, desc: "Vif et minéral, notes de citron vert et d'herbes fraîches", emoji: "🍾", stock: 18, active: true },
{ id: 28, name: "Blanc Chardonnay Bourgogne", category: "vin", type: "Blanc", deg: "13°", price: 19.90, desc: "Rond et fruité, notes de pomme et de vanille légère", emoji: "🍾", stock: 12, active: true },
{ id: 29, name: "Rouge Bordeaux AOC", category: "vin", type: "Rouge", deg: "14°", price: 15.90, desc: "Tanins souples, cassis, cerise noire", emoji: "🍷", stock: 16, active: true },
{ id: 30, name: "Rouge Côtes du Rhône", category: "vin", type: "Rouge", deg: "14.5°",price: 17.50, desc: "Charnu et épicé, Grenache & Syrah", emoji: "🍷", stock: 14, active: true },
{ id: 31, name: "Champagne Brut NM", category: "champagne", type: "Champagne", deg: "12°", price: 29.90, desc: "Bulles fines, notes briochées et citronnées", emoji: "🍾", stock: 10, active: true },
{ id: 32, name: "Champagne Grande Cuvée", category: "champagne", type: "Champagne", deg: "12.5°",price: 49.90, desc: "Assemblage Pinot Noir & Chardonnay, complexité et élégance", emoji: "🍾", stock: 8, active: true },
{ id: 33, name: "Champagne Rosé Prestige", category: "champagne", type: "Champagne Rosé", deg: "12°", price: 54.90, desc: "Fruits rouges, framboise, fraise, idéal pour célébrer", emoji: "🍾", stock: 6, active: true },
{ id: 34, name: "Prosecco Extra Dry", category: "champagne", type: "Prosecco", deg: "11°", price: 16.90, desc: "Bulles légères, poires et fleurs blanches", emoji: "🥂", stock: 14, active: true },
{ id: 35, name: "Crémant d'Alsace Brut", category: "champagne", type: "Crémant", deg: "12°", price: 18.90, desc: "Effervescence fine, pomme verte et brioche", emoji: "🥂", stock: 12, active: true },
{ id: 11, name: "Chips Nature Croustillantes", category: "apero", type: "Chips", deg: "", price: 2.50, desc: "Pommes de terre sélectionnées, cuisson à l'ancienne", emoji: "🥔", stock: 50, active: true },
{ id: 12, name: "Chips Paprika Fumé", category: "apero", type: "Chips", deg: "", price: 2.50, desc: "Saveur fumée intense, idéales avec une bière fraîche", emoji: "🥔", stock: 45, active: true },
{ id: 13, name: "Cacahouètes Grillées Salées", category: "apero", type: "Cacahouètes", deg: "", price: 3.20, desc: "Grillées à sec, légèrement salées, format 250g", emoji: "🥜", stock: 40, active: true },
{ id: 14, name: "Cacahouètes Épicées", category: "apero", type: "Cacahouètes", deg: "", price: 3.50, desc: "Piment doux, paprika, une petite bombe de saveurs", emoji: "🥜", stock: 35, active: true },
{ id: 15, name: "Saucisson Sec Artisanal", category: "apero", type: "Saucisson", deg: "", price: 6.90, desc: "Pur porc, séchage naturel, caractère authentique", emoji: "🥩", stock: 20, active: true },
{ id: 16, name: "Saucisson au Poivre", category: "apero", type: "Saucisson", deg: "", price: 7.50, desc: "Enrobé de poivre noir concassé", emoji: "🥩", stock: 15, active: true },
{ id: 17, name: "Popcorn Beurre & Sel", category: "apero", type: "Popcorn", deg: "", price: 2.80, desc: "Beurre fondu, sel fin, grand format", emoji: "🍿", stock: 60, active: true },
{ id: 18, name: "Popcorn Caramel", category: "apero", type: "Popcorn", deg: "", price: 3.00, desc: "Caramel doré croustillant, sucré-salé irrésistible", emoji: "🍿", stock: 55, active: true },
{ id: 19, name: "Biscuits Apéro Mélange", category: "apero", type: "Biscuits", deg: "", price: 3.80, desc: "Crackers, gressins, bretzel, toasts", emoji: "🫙", stock: 30, active: true },
{ id: 20, name: "Biscuits Fromage", category: "apero", type: "Biscuits", deg: "", price: 3.60, desc: "Sablés au parmesan et romarin, fondants en bouche", emoji: "🫙", stock: 28, active: true },
{ id: 21, name: "Tartinade Tapenade", category: "apero", type: "Tartinade", deg: "", price: 4.20, desc: "Olives noires, câpres, anchois, huile d'olive vierge", emoji: "🫒", stock: 22, active: true },
{ id: 22, name: "Tartinade Rillettes de Canard",category: "apero", type: "Tartinade", deg: "", price: 5.50, desc: "Canard du Périgord, recette traditionnelle", emoji: "🫙", stock: 18, active: true },
{ id: 23, name: "Pain Sec aux Herbes", category: "apero", type: "Pain sec", deg: "", price: 3.10, desc: "Biscuits croustillants, thym, romarin", emoji: "🍞", stock: 40, active: true },
{ id: 24, name: "Pain Sec Graines & Céréales", category: "apero", type: "Pain sec", deg: "", price: 3.30, desc: "Sésame, lin, tournesol, pavot", emoji: "🍞", stock: 35, active: true },
{ id: 36, name: "Coca-Cola 33cl x6", category: "soft", type: "Soda", deg: "", price: 7.50, desc: "Le classique incontournable, pack de 6 canettes", emoji: "🥤", stock: 40, active: true },
{ id: 37, name: "Schweppes Tonic x6", category: "soft", type: "Mixer", deg: "", price: 7.90, desc: "Indispensable avec le gin", emoji: "🥤", stock: 35, active: true },
{ id: 38, name: "Schweppes Agrum x6", category: "soft", type: "Mixer", deg: "", price: 7.90, desc: "Agrumes et bulles, parfait avec vodka ou rhum", emoji: "🥤", stock: 30, active: true },
{ id: 39, name: "Red Bull Original x4", category: "soft", type: "Énergie", deg: "", price: 8.90, desc: "La référence, caféine & taurine", emoji: "⚡", stock: 25, active: true },
{ id: 40, name: "Red Bull Watermelon x4", category: "soft", type: "Énergie", deg: "", price: 9.50, desc: "Saveur pastèque, édition spéciale", emoji: "⚡", stock: 20, active: true },
{ id: 41, name: "Monster Energy x4", category: "soft", type: "Énergie", deg: "", price: 9.90, desc: "500ml par canette, boost intense", emoji: "⚡", stock: 22, active: true },
{ id: 42, name: "Eau Gazeuse San Pellegrino x6",category: "soft", type: "Eau gazeuse", deg: "", price: 6.50, desc: "Bulles naturelles, minéraux italiens", emoji: "💧", stock: 45, active: true },
{ id: 43, name: "Perrier Citron x6", category: "soft", type: "Eau gazeuse", deg: "", price: 6.90, desc: "Eau gazeuse au citron, légère et rafraîchissante", emoji: "💧", stock: 40, active: true },
{ id: 44, name: "Jus d'Orange Pressé 1L", category: "soft", type: "Jus", deg: "", price: 4.90, desc: "Pur jus, sans sucres ajoutés", emoji: "🍊", stock: 30, active: true },
{ id: 45, name: "Jus de Cranberry 1L", category: "soft", type: "Jus", deg: "", price: 5.50, desc: "Incontournable pour les cocktails", emoji: "🍹", stock: 25, active: true },
{ id: 46, name: "Glaçons 2kg", category: "accessoire", type: "Glaçons", deg: "", price: 4.90, desc: "Sac de 2kg, glaçons cristallins", emoji: "🧊", stock: 50, active: true },
{ id: 47, name: "Glaçons 5kg", category: "accessoire", type: "Glaçons", deg: "", price: 9.90, desc: "Grand format 5kg, pour les grosses soirées", emoji: "🧊", stock: 30, active: true },
{ id: 48, name: "Verres Plastique x50", category: "accessoire", type: "Verres", deg: "", price: 4.50, desc: "Verres transparents 25cl, robustes", emoji: "🥛", stock: 60, active: true },
{ id: 49, name: "Flûtes Plastique x20", category: "accessoire", type: "Verres", deg: "", price: 5.90, desc: "Flûtes à champagne plastique", emoji: "🥂", stock: 40, active: true },
{ id: 50, name: "Pailles Colorées x100", category: "accessoire", type: "Pailles", deg: "", price: 2.90, desc: "Pailles multicolores pour cocktails", emoji: "🎨", stock: 55, active: true },
{ id: 51, name: "Serviettes Cocktail x50", category: "accessoire", type: "Serviettes", deg: "", price: 3.50, desc: "Serviettes en papier noir élégant", emoji: "🖤", stock: 45, active: true },
{ id: 52, name: "Seau à Glaçons", category: "accessoire", type: "Seau", deg: "", price: 7.90, desc: "Seau chromé avec pince", emoji: "🪣", stock: 20, active: true },
{ id: 53, name: "Décapsuleur Porte-clé", category: "accessoire", type: "Décapsuleur", deg: "", price: 2.50, desc: "Solide et compact", emoji: "🔑", stock: 35, active: true },
];

const INIT_PROMOS = [
{ code: "NUIT10", type: "percent", discount: 10, minOrder: 20, uses: 14, maxUses: 50, active: true, expires: "31/12/2026" },
{ code: "BIENVENUE", type: "fixed", discount: 5, minOrder: 15, uses: 28, maxUses: 100, active: true, expires: "31/12/2026" },
{ code: "SOIREE15", type: "percent", discount: 15, minOrder: 40, uses: 7, maxUses: 30, active: true, expires: "30/06/2026" },
{ code: "KEISEN", type: "fixed", discount: 8, minOrder: 30, uses: 11, maxUses: 40, active: false, expires: "30/06/2026" },
];

const INIT_ORDERS = [
{ id: "KN-001", client: "Mehdi B.", phone: "06 12 34 56 78", address: "12 rue des Lilas, Évry (91)", items: ["IPA Sauvage x2", "Cacahouètes Grillées", "Glaçons 2kg"], total: 16.40, zone: "Zone 1", status: "livré", time: "23:14", date: "29/05/2026", promo: null },
{ id: "KN-002", client: "Sarah D.", phone: "07 98 76 54 32", address: "5 av. Victor Hugo, Créteil (94)", items: ["Champagne Rosé Prestige", "Flûtes Plastique x20", "Popcorn Caramel"],total: 63.70, zone: "Zone 2", status: "en cours", time: "23:47", date: "29/05/2026", promo: "BIENVENUE" },
{ id: "KN-003", client: "Jordan K.", phone: "06 55 44 33 22", address: "8 bis rue du Moulin, Massy (91)", items: ["Pack Apéro Entre Amis", "Coca-Cola x6", "Schweppes Tonic x6"], total: 43.90, zone: "Zone 1", status: "en attente", time: "00:03", date: "30/05/2026", promo: null },
{ id: "KN-004", client: "Lucie M.", phone: "06 22 11 00 99", address: "3 impasse des Roses, Melun (77)", items: ["Whisky Single Malt 12 ans", "Saucisson Sec", "Pain Sec aux Herbes"], total: 65.70, zone: "Zone 3", status: "en cours", time: "00:21", date: "30/05/2026", promo: "KEISEN" },
{ id: "KN-005", client: "Thomas R.", phone: "07 33 44 55 66", address: "27 bd Gambetta, Vincennes (94)", items: ["Pack Grosse Soirée", "Red Bull x4"], total: 63.80, zone: "Zone 2", status: "annulé", time: "01:05", date: "30/05/2026", promo: null },
{ id: "KN-006", client: "Aïcha N.", phone: "06 77 88 99 00", address: "14 rue de la Paix, Corbeil (91)", items: ["Prosecco Extra Dry", "Verres Plastique x50", "Chips Paprika Fumé x2"],total: 29.90, zone: "Zone 1", status: "livré", time: "01:38", date: "30/05/2026", promo: "NUIT10" },
];

const ZONES = {
1: { label: "Zone 1 — Proche", time: "< 15 min", minOrder: 20, deliveryFee: 4.90, freeFrom: 30, color: "#2ecc71", dept: ["91"], cities: ["Évry","Corbeil-Essonnes","Massy","Palaiseau","Saclay","Gif-sur-Yvette","Orsay","Les Ulis","Longjumeau","Savigny-sur-Orge","Viry-Châtillon","Juvisy-sur-Orge"] },
2: { label: "Zone 2 — Moyenne", time: "15–25 min", minOrder: 35, deliveryFee: 4.90, freeFrom: 30, color: "#D4A843", dept: ["94"], cities: ["Créteil","Vincennes","Saint-Maur-des-Fossés","Vitry-sur-Seine","Ivry-sur-Seine","Charenton-le-Pont","Maisons-Alfort","Alfortville","Champigny-sur-Marne","Nogent-sur-Marne"] },
3: { label: "Zone 3 — Lointaine",time: "> 25 min", minOrder: 55, deliveryFee: 4.90, freeFrom: 30, color: "#e74c3c", dept: ["77"], cities: ["Melun","Meaux","Chelles","Torcy","Marne-la-Vallée","Lagny-sur-Marne","Pontault-Combault","Combs-la-Ville","Savigny-le-Temple","Noisiel"] },
};

const PACKS = [
{ id: 101, name: "Pack Soirée Détente", price: 18.90, originalPrice: 22.40, emoji: "🌙", badge: "BEST-SELLER", badgeColor: "#D4A843", desc: "L'essentiel pour une soirée tranquille à deux.", items: ["🍺 Blonde Dorée x2", "🥜 Cacahouètes Grillées", "🍿 Popcorn Beurre & Sel"] },
{ id: 102, name: "Pack Apéro Entre Amis", price: 28.50, originalPrice: 34.70, emoji: "🎉", badge: "POPULAIRE", badgeColor: "#8B5CF6", desc: "Parfait pour 4-6 personnes.", items: ["🍺 IPA Sauvage x2", "🍺 Blonde Dorée x2", "🥩 Saucisson Sec", "🫒 Tartinade Tapenade", "🍞 Pain Sec aux Herbes", "🥜 Cacahouètes Épicées"] },
{ id: 103, name: "Pack Grosse Soirée", price: 54.90, originalPrice: 67.20, emoji: "🔥", badge: "-18%", badgeColor: "#e74c3c", desc: "Pour les grandes occasions — 8 personnes et plus.", items: ["🍺 IPA Sauvage x3", "🍺 Triple Abbaye x2", "🥃 Whisky Single Malt", "🥩 Saucisson au Poivre", "🫒 Tartinade Rillettes", "🍞 Pain Sec x2", "🍿 Popcorn Caramel", "🫙 Biscuits Apéro"] },
{ id: 104, name: "Pack Spiritueux Premium", price: 42.00, originalPrice: 51.00, emoji: "🥃", badge: "PREMIUM", badgeColor: "#D4A843", desc: "Pour les amateurs de beaux alcools.", items: ["🥃 Rhum Agricole AOC", "🍸 Gin Botanique No.7", "🥔 Chips Paprika Fumé", "🫙 Biscuits Fromage", "🥜 Cacahouètes Grillées"] },
];

const REVIEWS = [
{ id: 1, name: "Mehdi B.", stars: 5, date: "12 mai 2025", text: "Livraison ultra rapide, il était 23h30 et j'avais tout reçu en 35 min. Le saucisson et les bières étaient au top !", avatar: "🧑🏽" },
{ id: 2, name: "Lucie M.", stars: 5, date: "3 avril 2025", text: "Parfait pour une soirée impro entre amis. Le pack Apéro entre amis vaut vraiment le coup. Je recommande !", avatar: "👩🏻" },
{ id: 3, name: "Jordan K.", stars: 4, date: "28 mars 2025", text: "Top concept, ça manquait dans le 91. Juste la livraison un peu en retard mais le livreur très sympa.", avatar: "🧑🏿" },
{ id: 4, name: "Sarah D.", stars: 5, date: "14 février 2025", text: "Champagne rosé + flûtes plastiques livrés pour mon anniversaire à minuit. Magique ! Merci Le Keïsen Night 🌙", avatar: "👩🏽" },
{ id: 5, name: "Thomas R.", stars: 5, date: "8 janvier 2025", text: "Le whisky single malt est excellent et le prix est honnête. Site facile à utiliser, je reviendrai.", avatar: "🧑🏼" },
{ id: 6, name: "Aïcha N.", stars: 4, date: "31 décembre 2024", text: "Commandé pour le réveillon, livraison pile à l'heure. Les glaçons et le prosecco étaient parfaits !", avatar: "👩🏾" },
];

const SHOP_NAME = "Le Keïsen Night";

// ─── UTILS ──────────────────────────────────────────────────
function useClock() {
const [now, setNow] = useState(new Date());
useEffect(() => { const t = setInterval(() => setNow(new Date()), 1000); return () => clearInterval(t); }, []);
return now;
}
const isOpen = (now) => { const h = now.getHours(); return h >= 22 || h < 6; };
const getCountdown = (now) => {
const h = now.getHours(), m = now.getMinutes(), s = now.getSeconds();
if (h >= 6 && h < 22) {
let dh = 22-h-1, dm = 59-m, ds = 59-s;
if(ds<0){ds+=60;dm--;} if(dm<0){dm+=60;dh--;}
return {h:Math.max(0,dh), m:Math.max(0,dm), s:Math.max(0,ds)};
}
return null;
};
const pad = n => String(n).padStart(2,"0");

const MoonLogo = ({size=36}) => (
<svg width={size} height={size} viewBox="0 0 36 36" fill="none">
<defs><radialGradient id="mg" cx="40%" cy="35%" r="60%"><stop offset="0%" stopColor="#FFE08A"/><stop offset="100%" stopColor="#D4A843"/></radialGradient></defs>
<path d="M18 4C10.268 4 4 10.268 4 18C4 25.732 10.268 32 18 32C21.5 32 24.7 30.7 27.2 28.5C25.5 28.8 23.8 29 22 29C13.716 29 7 22.284 7 14C7 10.2 8.4 6.7 10.8 4C13.1 4 18 4 18 4Z" fill="url(#mg)"/>
<circle cx="14" cy="13" r="1.5" fill="#C49020" opacity="0.5"/>
<circle cx="20" cy="20" r="1" fill="#C49020" opacity="0.4"/>
<circle cx="11" cy="20" r="0.8" fill="#C49020" opacity="0.3"/>
</svg>
);

const Stars = () => (
<div style={{position:"absolute",inset:0,overflow:"hidden",pointerEvents:"none"}}>
{[...Array(28)].map((_,i)=>(
<div key={i} style={{position:"absolute",width:i%5===0?"2px":"1px",height:i%5===0?"2px":"1px",background:"#fff",borderRadius:"50%",left:`${(i*37+11)%100}%`,top:`${(i*23+7)%100}%`,opacity:0.15+(i%4)*0.1,animation:`twinkle ${2+(i%3)}s ${(i*0.3)%2}s infinite alternate`}}/>
))}
</div>
);

// ─── CSS GLOBAL ─────────────────────────────────────────────
const GLOBAL_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400&family=DM+Sans:wght@300;400;500;600;700&display=swap');
*{box-sizing:border-box;margin:0;padding:0}
::-webkit-scrollbar{width:4px}::-webkit-scrollbar-track{background:#111}::-webkit-scrollbar-thumb{background:#8B6914}
.card{transition:transform 0.3s,box-shadow 0.3s}.card:hover{transform:translateY(-4px);box-shadow:0 20px 40px rgba(0,0,0,0.7)!important}
.row:hover{background:rgba(255,255,255,0.02)!important}
.tab-btn:hover{color:#D4A843!important}
.btn-sm:hover{opacity:0.8}
input:focus,select:focus,textarea:focus{border-color:#D4A843!important}
@keyframes slideIn{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
@keyframes fadeUp{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}
@keyframes pulse{0%,100%{opacity:1}50%{opacity:0.4}}
@keyframes twinkle{from{opacity:0.1}to{opacity:0.6}}
@keyframes moonFloat{0%,100%{transform:translateY(0) rotate(-5deg)}50%{transform:translateY(-4px) rotate(5deg)}}
@keyframes waFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-5px)}}
@keyframes shake{0%,100%{transform:translateX(0)}25%{transform:translateX(-8px)}75%{transform:translateX(8px)}}
@keyframes notif{0%{opacity:0;transform:translateY(20px)}10%,90%{opacity:1;transform:translateY(0)}100%{opacity:0;transform:translateY(-10px)}}
.fade-up{animation:fadeUp 0.45s ease forwards}
`;

const STATUS_COLORS = {
"livré": {bg:"rgba(46,204,113,0.12)", color:"#2ecc71", border:"#2ecc7133"},
"en cours": {bg:"rgba(212,168,67,0.12)", color:"#D4A843", border:"#D4A84333"},
"en attente": {bg:"rgba(52,152,219,0.12)", color:"#3498db", border:"#3498db33"},
"annulé": {bg:"rgba(231,76,60,0.12)", color:"#e74c3c", border:"#e74c3c33"},
};
const CAT_COLORS = {biere:"#D4A843",alcool:"#e74c3c",champagne:"#FFE08A",apero:"#2ecc71",soft:"#3498db",accessoire:"#95a5a6",vin:"#9b59b6"};

// ════════════════════════════════════════════════════════════
// BOUTIQUE
// ════════════════════════════════════════════════════════════

const ZoneSelector = ({onSelect}) => {
const [search, setSearch] = useState("");
const matchingZone = search.length >= 2 ? Object.entries(ZONES).find(([,z]) =>
z.dept.some(d=>search.startsWith(d)) || z.cities.some(c=>c.toLowerCase().includes(search.toLowerCase()))
) : null;
return (
<div style={{position:"fixed",inset:0,zIndex:400,background:"rgba(0,0,0,0.92)",display:"flex",alignItems:"center",justifyContent:"center",padding:"16px"}}>
<div style={{background:"#0d0d1a",border:"1px solid #1a1a2e",borderRadius:"12px",padding:"32px",maxWidth:"500px",width:"100%",maxHeight:"90vh",overflowY:"auto"}}>
<div style={{textAlign:"center",marginBottom:"24px"}}>
<MoonLogo size={40}/>
<h2 style={{fontFamily:"'Playfair Display',serif",fontSize:"20px",color:"#D4A843",marginTop:"10px",marginBottom:"4px"}}>Votre zone de livraison</h2>
<p style={{color:"#555",fontSize:"12px"}}>Entrez votre ville ou code postal</p>
</div>
<input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Ex : Évry, Créteil, 91000..."
style={{width:"100%",padding:"13px",background:"#111118",border:"1px solid #2a2a3e",borderRadius:"6px",color:"#fff",fontFamily:"'DM Sans',sans-serif",fontSize:"14px",outline:"none",marginBottom:"14px"}}/>
{search.length>=2 && (
<div style={{marginBottom:"18px"}}>
{matchingZone ? (
<div style={{background:`${matchingZone[1].color}10`,border:`1px solid ${matchingZone[1].color}55`,borderRadius:"8px",padding:"14px"}}>
<p style={{color:matchingZone[1].color,fontWeight:700,fontSize:"13px",marginBottom:"4px"}}>✅ {matchingZone[1].label} ({matchingZone[1].time})</p>
<p style={{color:"#aaa",fontSize:"12px"}}>Min. <strong style={{color:"#fff"}}>{matchingZone[1].minOrder} €</strong> · Gratuite dès <strong style={{color:"#2ecc71"}}>30 €</strong></p>
<button onClick={()=>onSelect(parseInt(matchingZone[0]))} style={{marginTop:"10px",background:"#D4A843",color:"#0a0a0a",border:"none",padding:"9px 22px",borderRadius:"4px",cursor:"pointer",fontFamily:"'DM Sans',sans-serif",fontSize:"12px",fontWeight:700}}>CHOISIR →</button>
</div>
):(
<div style={{background:"rgba(231,76,60,0.08)",border:"1px solid #e74c3c44",borderRadius:"8px",padding:"12px"}}>
<p style={{color:"#e74c3c",fontSize:"12px",fontWeight:600}}>❌ Zone non couverte — nous livrons dans le 91, 94 et 77.</p>
</div>
)}
</div>
)}
<p style={{color:"#333",fontSize:"9px",letterSpacing:"3px",marginBottom:"12px"}}>TOUTES LES ZONES</p>
<div style={{display:"flex",flexDirection:"column",gap:"8px"}}>
{Object.entries(ZONES).map(([zid,z])=>(
<div key={zid} onClick={()=>onSelect(parseInt(zid))} style={{background:"#111118",border:"1px solid #1a1a2e",borderRadius:"8px",padding:"13px",cursor:"pointer",transition:"border-color 0.2s"}}
onMouseOver={e=>e.currentTarget.style.borderColor=z.color} onMouseOut={e=>e.currentTarget.style.borderColor="#1a1a2e"}>
<div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"4px"}}>
<span style={{color:z.color,fontWeight:700,fontSize:"13px"}}>{z.label}</span>
<span style={{fontSize:"10px",color:z.color,background:`${z.color}18`,padding:"2px 8px",borderRadius:"8px"}}>{z.time}</span>
</div>
<div style={{display:"flex",gap:"14px",flexWrap:"wrap"}}>
<span style={{color:"#555",fontSize:"11px"}}>Dép. <strong style={{color:"#aaa"}}>{z.dept.join(", ")}</strong></span>
<span style={{color:"#555",fontSize:"11px"}}>Min. <strong style={{color:"#D4A843"}}>{z.minOrder} €</strong></span>
<span style={{color:"#555",fontSize:"11px"}}>Gratuite dès <strong style={{color:"#2ecc71"}}>30 €</strong></span>
</div>
<p style={{color:"#2a2a3a",fontSize:"10px",marginTop:"4px"}}>{z.cities.slice(0,5).join(", ")}…</p>
</div>
))}
</div>
</div>
</div>
);
};

const AgeGate = ({onConfirm}) => {
const [day,setDay]=useState(""); const [month,setMonth]=useState(""); const [year,setYear]=useState(""); const [error,setError]=useState("");
const verify=()=>{
const d=parseInt(day),m=parseInt(month),y=parseInt(year);
if(!d||!m||!y||y<1900||y>2025){setError("Date invalide.");return;}
const birth=new Date(y,m-1,d),now=new Date();
let age=now.getFullYear()-birth.getFullYear();
if(now<new Date(now.getFullYear(),birth.getMonth(),birth.getDate()))age--;
age>=18?onConfirm():setError("❌ Vous devez avoir 18 ans ou plus.");
};
return (
<div style={{minHeight:"100vh",background:"radial-gradient(ellipse at top,#0d1a2e 0%,#0a0a0a 70%)",display:"flex",alignItems:"center",justifyContent:"center",position:"relative"}}>
<Stars/>
<div style={{background:"linear-gradient(135deg,rgba(13,26,46,0.97),rgba(10,10,18,0.98))",border:"1px solid #8B6914",borderRadius:"10px",padding:"50px 44px",maxWidth:"420px",width:"90%",textAlign:"center",boxShadow:"0 40px 80px rgba(0,0,0,0.9)",position:"relative",zIndex:1}}>
<div style={{marginBottom:"14px",animation:"moonFloat 4s ease-in-out infinite"}}><MoonLogo size={58}/></div>
<h1 style={{color:"#D4A843",fontSize:"22px",fontWeight:900,letterSpacing:"2px",marginBottom:"4px",fontFamily:"'Playfair Display',serif"}}>{SHOP_NAME}</h1>
<p style={{color:"#444",fontSize:"9px",letterSpacing:"5px",marginBottom:"22px",fontFamily:"'DM Sans',sans-serif"}}>LIVRAISON DE NUIT · 22H–6H</p>
<p style={{color:"#bbb",fontSize:"13px",marginBottom:"20px",fontFamily:"'DM Sans',sans-serif",lineHeight:1.7}}>Ce site vend de l'alcool. Vous devez avoir <strong style={{color:"#D4A843"}}>18 ans ou plus</strong> pour y accéder.</p>
<div style={{display:"flex",gap:"8px",justifyContent:"center",marginBottom:"18px"}}>
{[{val:day,set:setDay,ph:"JJ",w:"64px"},{val:month,set:setMonth,ph:"MM",w:"64px"},{val:year,set:setYear,ph:"AAAA",w:"84px"}].map(({val,set,ph,w})=>(
<input key={ph} value={val} onChange={e=>set(e.target.value.replace(/\D/g,""))} placeholder={ph} maxLength={ph==="AAAA"?4:2}
style={{width:w,padding:"11px 6px",textAlign:"center",background:"#111",border:"1px solid #2a2a3e",borderRadius:"4px",color:"#fff",fontSize:"16px",fontFamily:"'DM Sans',sans-serif",outline:"none"}}/>
))}
</div>
{error&&<p style={{color:"#e74c3c",fontSize:"12px",marginBottom:"12px"}}>{error}</p>}
<button onClick={verify} onMouseOver={e=>e.target.style.background="#e8bc58"} onMouseOut={e=>e.target.style.background="#D4A843"}
style={{background:"#D4A843",color:"#0a0a0a",border:"none",padding:"13px",fontSize:"12px",fontWeight:700,letterSpacing:"2px",cursor:"pointer",borderRadius:"4px",fontFamily:"'DM Sans',sans-serif",width:"100%",transition:"background 0.2s"}}>
CONFIRMER MON ÂGE
</button>
<p style={{color:"#2a2a3a",fontSize:"10px",marginTop:"18px",fontFamily:"'DM Sans',sans-serif",lineHeight:1.8}}>L'abus d'alcool est dangereux pour la santé.<br/>Vente interdite aux mineurs de moins de 18 ans.</p>
</div>
</div>
);
};

function Shop({products: productsProp, promos: promosProp, orders: ordersProp, onNewOrder}) {
const [zoneId,setZoneId]=useState(null);
const [cart,setCart]=useState([]);
const [filter,setFilter]=useState("tous");
const [cartOpen,setCartOpen]=useState(false);
const [checkoutStep,setCheckoutStep]=useState(null);
const [added,setAdded]=useState(null);
const [showZone,setShowZone]=useState(false);
const [page,setPage]=useState("shop");
const [promoCode,setPromoCode]=useState("");
const [appliedPromo,setAppliedPromo]=useState(null);
const [promoError,setPromoError]=useState("");
const [promoSuccess,setPromoSuccess]=useState("");
const [form,setForm]=useState({prenom:"",nom:"",email:"",tel:"",adresse:"",ville:"",cp:""});
const now=useClock();
const open=isOpen(now);
const countdown=getCountdown(now);
const zone=zoneId?ZONES[zoneId]:null;
const activeProducts = productsProp.filter(p=>p.active);
const filtered=filter==="packs"?[]:filter==="tous"?activeProducts:activeProducts.filter(p=>p.category===filter);
const showPacks=filter==="packs"||filter==="tous";

const promoMap = {};
promosProp.filter(p=>p.active).forEach(p=>{ promoMap[p.code]=p; });

const addToCart=(p,isPack=false)=>{
setCart(prev=>{const ex=prev.find(i=>i.id===p.id);return ex?prev.map(i=>i.id===p.id?{...i,qty:i.qty+1}:i):[...prev,{...p,qty:1,isPack}];});
setAdded(p.id);setTimeout(()=>setAdded(null),1200);
};
const removeFromCart=id=>setCart(prev=>prev.filter(i=>i.id!==id));
const updateQty=(id,d)=>setCart(prev=>prev.map(i=>i.id===id?{...i,qty:Math.max(1,i.qty+d)}:i));
const subtotal=cart.reduce((s,i)=>s+i.price*i.qty,0);
const promoDiscount=appliedPromo?(appliedPromo.type==="percent"?subtotal*(appliedPromo.discount/100):Math.min(appliedPromo.discount,subtotal)):0;
const discountedSubtotal=subtotal-promoDiscount;
const deliveryFee=zone?(discountedSubtotal>=30?0:4.90):4.90;
const total=discountedSubtotal+deliveryFee;
const cartCount=cart.reduce((s,i)=>s+i.qty,0);
const minOrder=zone?zone.minOrder:15;
const canOrder=subtotal>=minOrder;

const applyPromo=()=>{
const code=promoCode.trim().toUpperCase();
if(!code){setPromoError("Entrez un code promo.");return;}
const found=promoMap[code];
if(!found){setPromoError("Code invalide ❌");setPromoSuccess("");return;}
if(subtotal<found.minOrder){setPromoError(`Minimum ${found.minOrder} € requis.`);setPromoSuccess("");return;}
setAppliedPromo({...found,code});setPromoSuccess(`✅ Code "${code}" appliqué !`);setPromoError("");
};
const removePromo=()=>{setAppliedPromo(null);setPromoCode("");setPromoSuccess("");setPromoError("");};

const getBadge=(p)=>{
if(p.deg) return {text:p.deg,bg:"#D4A843",color:"#0a0a0a",border:null};
if(p.category==="soft") return {text:"SOFT",bg:"rgba(52,152,219,0.12)",color:"#3498db",border:"#3498db55"};
if(p.category==="accessoire") return {text:"ACCÈS.",bg:"rgba(149,165,166,0.12)",color:"#95a5a6",border:"#95a5a655"};
if(p.category==="vin") return {text:"VIN",bg:"rgba(155,89,182,0.12)",color:"#9b59b6",border:"#9b59b655"};
if(p.category==="champagne") return {text:"🥂",bg:"rgba(212,168,67,0.12)",color:"#D4A843",border:"#D4A84355"};
return {text:"APÉRO",bg:"rgba(46,204,113,0.1)",color:"#2ecc71",border:"#2ecc7155"};
};

const confirmOrder=()=>{
const newOrder={
id:`KN-${String(Date.now()).slice(-4)}`,
client:`${form.prenom} ${form.nom}`,
phone:form.tel,
address:`${form.adresse}, ${form.ville} (${zone?.dept[0]||"?"})`,
items:cart.map(i=>`${i.name} x${i.qty}`),
total,zone:zone?.label||"?",
status:"en attente",
time:new Date().toLocaleTimeString('fr-FR',{hour:'2-digit',minute:'2-digit'}),
date:new Date().toLocaleDateString('fr-FR'),
promo:appliedPromo?.code||null,
};
onNewOrder(newOrder);
setCheckoutStep("success");
setCart([]);
setAppliedPromo(null);
};

if(page==="contact") return <ContactPageShop onClose={()=>setPage("shop")} />;
if(page==="cgv") return <CGVPageShop onClose={()=>setPage("shop")} />;
if(page==="tracking") return <TrackingPage orders={ordersProp} onClose={()=>setPage("shop")} />;

return (
<div style={{minHeight:"100vh",background:"#0a0a12",fontFamily:"'DM Sans',sans-serif",color:"#fff"}}>
{showZone&&<ZoneSelector onSelect={z=>{setZoneId(z);setShowZone(false);}}/>}

{/* Banner */}
<div style={{background:open?"linear-gradient(90deg,#0d1f0d,#0a1a0a)":"linear-gradient(90deg,#1f1205,#120a03)",borderBottom:`1px solid ${open?"#2ecc7133":"#D4A84333"}`,padding:"8px 20px",display:"flex",alignItems:"center",justifyContent:"center",gap:"10px",flexWrap:"wrap"}}>
<div style={{display:"flex",alignItems:"center",gap:"6px"}}>
<div style={{width:"6px",height:"6px",borderRadius:"50%",background:open?"#2ecc71":"#e67e22",animation:open?"pulse 2s infinite":"none"}}/>
<span style={{fontSize:"11px",fontWeight:700,color:open?"#2ecc71":"#e67e22",letterSpacing:"1px"}}>{open?"🌙 LIVRAISON OUVERTE":"😴 FERMÉ"}</span>
</div>
<span style={{color:"#2a2a3a"}}>·</span>
{open?<span style={{fontSize:"11px",color:"#666"}}>Livraison <strong style={{color:"#D4A843"}}>22h–6h</strong> · 91 · 94 · 77</span>
:countdown?<span style={{fontSize:"11px",color:"#666"}}>Ouverture dans <strong style={{color:"#D4A843"}}>{pad(countdown.h)}h{pad(countdown.m)}m{pad(countdown.s)}s</strong></span>:null}
<span style={{color:"#2a2a3a"}}>·</span>
<span style={{fontSize:"11px",color:"#666"}}>🚚 Gratuite dès <strong style={{color:"#2ecc71"}}>30 €</strong></span>
</div>

{/* Header */}
<header style={{position:"sticky",top:0,zIndex:100,background:"rgba(10,10,18,0.97)",backdropFilter:"blur(16px)",borderBottom:"1px solid #1a1a2e",padding:"0 20px",display:"flex",alignItems:"center",justifyContent:"space-between",height:"64px"}}>
<div style={{display:"flex",alignItems:"center",gap:"10px"}}>
<div style={{animation:"moonFloat 5s ease-in-out infinite"}}><MoonLogo size={34}/></div>
<div>
<div style={{fontFamily:"'Playfair Display',serif",fontSize:"17px",fontWeight:900,color:"#D4A843",letterSpacing:"1px"}}>{SHOP_NAME}</div>
<div style={{fontSize:"8px",color:"#333",letterSpacing:"3px"}}>BIÈRES · SPIRITUEUX · APÉRO</div>
</div>
</div>
<div style={{display:"flex",alignItems:"center",gap:"8px"}}>
<button onClick={()=>setPage("contact")} style={{background:"transparent",border:"1px solid #1a1a2e",color:"#666",padding:"7px 14px",borderRadius:"4px",cursor:"pointer",fontFamily:"'DM Sans',sans-serif",fontSize:"11px",fontWeight:600}} onMouseOver={e=>e.target.style.borderColor="#D4A843"} onMouseOut={e=>e.target.style.borderColor="#1a1a2e"}>CONTACT</button>
<button onClick={()=>setPage("tracking")} style={{background:"transparent",border:"1px solid #1a1a2e",color:"#666",padding:"7px 14px",borderRadius:"4px",cursor:"pointer",fontFamily:"'DM Sans',sans-serif",fontSize:"11px",fontWeight:600}} onMouseOver={e=>e.target.style.borderColor="#D4A843"} onMouseOut={e=>e.target.style.borderColor="#1a1a2e"}>📦 SUIVI</button>
<button onClick={()=>setShowZone(true)} style={{background:zone?`${zone.color}15`:"rgba(212,168,67,0.06)",border:`1px solid ${zone?zone.color+"55":"#D4A84333"}`,borderRadius:"16px",padding:"5px 12px",cursor:"pointer",color:zone?zone.color:"#D4A843",fontSize:"10px",fontWeight:600,fontFamily:"'DM Sans',sans-serif"}}>
{zone?`📍 ${zone.dept[0]}`:"📍 Zone"}
</button>
<button onClick={()=>setCartOpen(true)} style={{background:cartCount>0?"#D4A843":"transparent",color:cartCount>0?"#0a0a0a":"#D4A843",border:"1px solid #D4A843",padding:"7px 14px",borderRadius:"4px",cursor:"pointer",fontFamily:"'DM Sans',sans-serif",fontSize:"11px",fontWeight:700,letterSpacing:"1px",transition:"all 0.2s"}}>
🛒 {cartCount>0?`(${cartCount})`:"PANIER"}
</button>
</div>
</header>

{/* Promo banner */}
<div style={{background:"linear-gradient(90deg,#1a0d2e,#0d0a1a)",borderBottom:"1px solid #2a1a3e",padding:"10px 24px",display:"flex",alignItems:"center",justifyContent:"center",gap:"12px",flexWrap:"wrap"}}>
<span style={{fontSize:"13px"}}>🎁</span>
<span style={{color:"#D4A843",fontSize:"12px",fontWeight:700,letterSpacing:"1px"}}>CODE BIENVENUE</span>
<span style={{color:"#666",fontSize:"12px"}}>—</span>
<span style={{color:"#bbb",fontSize:"12px"}}>5 € offerts sur ta 1ère commande avec le code</span>
<span style={{background:"rgba(212,168,67,0.15)",border:"1px solid #D4A84355",color:"#D4A843",fontSize:"12px",fontWeight:700,padding:"3px 12px",borderRadius:"6px",letterSpacing:"2px"}}>BIENVENUE</span>
</div>

{/* Hero */}
<div style={{position:"relative",background:"radial-gradient(ellipse at top center,#0d1a2e 0%,#0a0a12 60%)",padding:"60px 24px 48px",textAlign:"center",borderBottom:"1px solid #1a1a2e",overflow:"hidden"}}>
<Stars/>
<div style={{position:"relative",zIndex:1}}>
<div style={{display:"inline-flex",alignItems:"center",gap:"8px",background:"rgba(212,168,67,0.07)",border:"1px solid rgba(212,168,67,0.2)",borderRadius:"20px",padding:"5px 14px",marginBottom:"18px"}}>
<span style={{fontSize:"10px",color:"#D4A843",letterSpacing:"2px",fontWeight:600}}>🌙 LIVRAISON DE NUIT · 22H – 6H · 91 · 94 · 77</span>
</div>
<h2 style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(28px,5vw,56px)",fontWeight:900,lineHeight:1.1,color:"#fff",marginBottom:"14px"}}>
Tout pour votre soirée,<br/><em style={{color:"#D4A843"}}>livré cette nuit</em>
</h2>
<p style={{color:"#555",maxWidth:"440px",margin:"0 auto 24px",fontSize:"14px",lineHeight:1.8}}>
Commandez maintenant. Livraison <strong style={{color:"#bbb"}}>dès 22h jusqu'à 6h</strong> en Île-de-France.
</p>
<button onClick={()=>setShowZone(true)} style={{background:"#D4A843",color:"#0a0a0a",border:"none",padding:"12px 26px",borderRadius:"6px",cursor:"pointer",fontFamily:"'DM Sans',sans-serif",fontSize:"12px",fontWeight:700,letterSpacing:"2px"}}>
📍 VÉRIFIER MA ZONE
</button>
</div>
</div>

{zone&&(
<div style={{background:`${zone.color}08`,borderBottom:`1px solid ${zone.color}22`,padding:"10px 24px",display:"flex",alignItems:"center",justifyContent:"center",gap:"16px",flexWrap:"wrap"}}>
<span style={{color:zone.color,fontWeight:700,fontSize:"12px"}}>📍 {zone.label} · Dép. {zone.dept.join(", ")}</span>
<span style={{color:"#333"}}>|</span>
<span style={{color:"#666",fontSize:"11px"}}>Min. <strong style={{color:"#D4A843"}}>{zone.minOrder} €</strong> · Gratuite dès <strong style={{color:"#2ecc71"}}>30 €</strong></span>
<button onClick={()=>setShowZone(true)} style={{background:"transparent",border:"1px solid #222",color:"#555",padding:"3px 10px",borderRadius:"8px",cursor:"pointer",fontFamily:"'DM Sans',sans-serif",fontSize:"10px"}}>Changer</button>
</div>
)}

{/* How it works */}
<div style={{background:"#0d0d1a",borderBottom:"1px solid #1a1a2e",padding:"32px 24px"}}>
<p style={{textAlign:"center",color:"#333",fontSize:"9px",letterSpacing:"4px",marginBottom:"24px"}}>COMMENT ÇA MARCHE</p>
<div style={{display:"flex",justifyContent:"center",gap:"6px",flexWrap:"wrap",maxWidth:"680px",margin:"0 auto"}}>
{[{icon:"🛒",n:"1",label:"Commandez",desc:"Avant 5h30 du matin"},{arrow:true},{icon:"✅",n:"2",label:"Confirmation",desc:"SMS immédiat"},{arrow:true},{icon:"🌙",n:"3",label:"Livraison",desc:"22h–6h, le soir même"}].map((item,i)=>
item.arrow?(
<div key={i} style={{display:"flex",alignItems:"center",color:"#1a1a2e",fontSize:"18px",padding:"0 4px"}}>→</div>
):(
<div key={i} style={{textAlign:"center",padding:"14px 18px",background:"rgba(255,255,255,0.02)",border:"1px solid #1e1e2e",borderRadius:"8px",minWidth:"120px"}}>
<div style={{fontSize:"26px",marginBottom:"6px"}}>{item.icon}</div>
<div style={{fontSize:"9px",color:"#D4A843",letterSpacing:"2px",marginBottom:"3px"}}>ÉTAPE {item.n}</div>
<div style={{fontSize:"13px",fontWeight:600,color:"#fff",marginBottom:"3px"}}>{item.label}</div>
<div style={{fontSize:"11px",color:"#444"}}>{item.desc}</div>
</div>
)
)}
</div>
</div>

{/* Filters */}
<div style={{padding:"22px 24px 0",display:"flex",gap:"8px",justifyContent:"center",flexWrap:"wrap"}}>
{[{key:"tous",label:"✨ Tout"},{key:"packs",label:"🎁 Packs"},{key:"biere",label:"🍺 Bières"},{key:"alcool",label:"🥃 Spiritueux"},{key:"vin",label:"🍷 Vins"},{key:"champagne",label:"🥂 Champagne"},{key:"soft",label:"🥤 Softs"},{key:"accessoire",label:"🧊 Accessoires"},{key:"apero",label:"🥜 Apéros"}].map(({key,label})=>(
<button key={key} onClick={()=>setFilter(key)} style={{padding:"7px 18px",borderRadius:"20px",cursor:"pointer",background:filter===key?"#D4A843":"transparent",color:filter===key?"#0a0a0a":"#555",border:`1px solid ${filter===key?"#D4A843":"#1e1e2e"}`,fontFamily:"'DM Sans',sans-serif",fontSize:"11px",fontWeight:600,letterSpacing:"1px",transition:"all 0.2s"}}>{label}</button>
))}
</div>

{/* Products */}
<div style={{padding:"20px 24px",maxWidth:"1200px",margin:"0 auto"}}>
{showPacks&&(
<div style={{marginBottom:filter==="tous"?"32px":"0"}}>
{filter==="tous"&&<p style={{color:"#D4A843",fontSize:"9px",letterSpacing:"4px",marginBottom:"14px"}}>PACKS SOIRÉE — ÉCONOMISEZ JUSQU'À 18%</p>}
<div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(255px,1fr))",gap:"16px"}}>
{PACKS.map((pack,i)=>(
<div key={pack.id} className="card fade-up" style={{background:"linear-gradient(135deg,#111118,#0d1020)",border:"1px solid #2a1a3e",borderRadius:"10px",overflow:"hidden",animationDelay:`${i*60}ms`,position:"relative"}}>
<div style={{position:"absolute",top:"12px",left:"12px",background:pack.badgeColor,color:"#0a0a0a",fontSize:"9px",fontWeight:700,padding:"3px 10px",borderRadius:"10px",letterSpacing:"1px",zIndex:1}}>{pack.badge}</div>
<div style={{background:"radial-gradient(ellipse at top,#1a0d2e,#0a0a18)",height:"110px",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"52px"}}>{pack.emoji}</div>
<div style={{padding:"16px"}}>
<h3 style={{fontFamily:"'Playfair Display',serif",fontSize:"15px",fontWeight:700,color:"#fff",marginBottom:"6px"}}>{pack.name}</h3>
<p style={{color:"#3a3a4a",fontSize:"11px",marginBottom:"10px",lineHeight:1.5}}>{pack.desc}</p>
<div style={{marginBottom:"12px"}}>{pack.items.map(item=><p key={item} style={{color:"#444",fontSize:"11px",lineHeight:1.7}}>• {item}</p>)}</div>
<div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginTop:"12px",paddingTop:"12px",borderTop:"1px solid #1a1a2e"}}>
<div>
<span style={{fontFamily:"'Playfair Display',serif",fontSize:"20px",fontWeight:700,color:"#D4A843"}}>{pack.price.toFixed(2)} €</span>
<span style={{color:"#2a2a3a",fontSize:"11px",textDecoration:"line-through",marginLeft:"6px"}}>{pack.originalPrice.toFixed(2)} €</span>
</div>
<button onClick={()=>addToCart(pack,true)} style={{background:added===pack.id?"#2ecc71":"#D4A843",color:"#0a0a0a",border:"none",padding:"8px 14px",borderRadius:"4px",cursor:"pointer",fontFamily:"'DM Sans',sans-serif",fontSize:"10px",fontWeight:700,letterSpacing:"1px",transition:"all 0.3s"}}>
{added===pack.id?"✓ AJOUTÉ":"+ PANIER"}
</button>
</div>
</div>
</div>
))}
</div>
</div>
)}

{filter!=="packs"&&(
<>
{filter==="tous"&&<p style={{color:"#D4A843",fontSize:"9px",letterSpacing:"4px",marginBottom:"14px"}}>TOUS LES PRODUITS</p>}
<div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(240px,1fr))",gap:"16px"}}>
{filtered.map((p,i)=>(
<div key={p.id} className="card fade-up" style={{background:"#111118",border:"1px solid #1a1a2e",borderRadius:"8px",overflow:"hidden",animationDelay:`${i*40}ms`}}>
<div style={{background:"radial-gradient(ellipse at top,#0d1a2e,#0a0a12)",height:"108px",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"50px",position:"relative"}}>
{p.emoji}
{(()=>{const b=getBadge(p);return b.text?(<span style={{position:"absolute",top:"10px",right:"10px",background:b.bg,color:b.color,border:b.border?`1px solid ${b.border}`:"none",fontSize:"9px",fontWeight:700,padding:"2px 8px",borderRadius:"8px"}}>{b.text}</span>):null;})()}
</div>
<div style={{padding:"14px"}}>
<div style={{fontSize:"8px",color:"#D4A843",letterSpacing:"3px",marginBottom:"4px"}}>{p.type.toUpperCase()}</div>
<h3 style={{fontFamily:"'Playfair Display',serif",fontSize:"14px",fontWeight:700,marginBottom:"6px",color:"#fff"}}>{p.name}</h3>
<p style={{color:"#3a3a4a",fontSize:"11px",lineHeight:1.6,marginBottom:"12px"}}>{p.desc}</p>
<div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
<span style={{fontFamily:"'Playfair Display',serif",fontSize:"17px",fontWeight:700,color:"#D4A843"}}>{p.price.toFixed(2)} €</span>
<button onClick={()=>addToCart(p)} style={{background:added===p.id?"#2ecc71":"#D4A843",color:"#0a0a0a",border:"none",padding:"7px 13px",borderRadius:"4px",cursor:"pointer",fontFamily:"'DM Sans',sans-serif",fontSize:"10px",fontWeight:700,letterSpacing:"1px",transition:"all 0.3s"}}>
{added===p.id?"✓ AJOUTÉ":"+ PANIER"}
</button>
</div>
</div>
</div>
))}
</div>
</>
)}
</div>

{/* Reviews */}
<div style={{background:"#0d0d1a",borderTop:"1px solid #1a1a2e",padding:"48px 24px",marginTop:"20px"}}>
<div style={{maxWidth:"1100px",margin:"0 auto"}}>
<div style={{textAlign:"center",marginBottom:"32px"}}>
<p style={{color:"#D4A843",fontSize:"9px",letterSpacing:"4px",marginBottom:"8px"}}>ILS NOUS FONT CONFIANCE</p>
<h3 style={{fontFamily:"'Playfair Display',serif",fontSize:"22px",color:"#fff",marginBottom:"8px"}}>Avis de nos clients</h3>
<div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:"4px"}}>
{"★★★★★".split("").map((s,i)=><span key={i} style={{color:"#D4A843",fontSize:"18px"}}>{s}</span>)}
<span style={{color:"#555",fontSize:"12px",marginLeft:"6px"}}>4.8/5 · {REVIEWS.length} avis</span>
</div>
</div>
<div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:"16px"}}>
{REVIEWS.map((r,i)=>(
<div key={r.id} className="fade-up" style={{background:"#111118",border:"1px solid #1a1a2e",borderRadius:"10px",padding:"20px",animationDelay:`${i*80}ms`}}>
<div style={{display:"flex",alignItems:"center",gap:"10px",marginBottom:"12px"}}>
<span style={{fontSize:"30px"}}>{r.avatar}</span>
<div style={{flex:1}}>
<p style={{fontWeight:700,fontSize:"13px",color:"#ddd"}}>{r.name}</p>
<p style={{color:"#333",fontSize:"11px"}}>{r.date}</p>
</div>
<div style={{display:"flex",gap:"2px"}}>
{[...Array(5)].map((_,j)=><span key={j} style={{color:j<r.stars?"#D4A843":"#1a1a2e",fontSize:"12px"}}>★</span>)}
</div>
</div>
<p style={{color:"#666",fontSize:"13px",lineHeight:1.7,fontStyle:"italic"}}>"{r.text}"</p>
</div>
))}
</div>
<div style={{textAlign:"center",marginTop:"32px",padding:"24px",background:"rgba(212,168,67,0.04)",border:"1px solid #D4A84322",borderRadius:"10px"}}>
<p style={{color:"#D4A843",fontSize:"13px",fontWeight:600,marginBottom:"6px"}}>Vous avez commandé chez nous ?</p>
<p style={{color:"#444",fontSize:"12px",marginBottom:"14px"}}>Laissez votre avis sur Instagram — ça nous aide énormément 🙏</p>
<div style={{display:"flex",gap:"10px",justifyContent:"center",flexWrap:"wrap"}}>
<a href="https://instagram.com/Lekeisen_night" target="_blank" rel="noreferrer" style={{background:"rgba(225,48,108,0.1)",border:"1px solid #E1306C44",color:"#E1306C",padding:"8px 18px",borderRadius:"6px",textDecoration:"none",fontSize:"12px",fontWeight:600}}>📸 Nous taguer sur Instagram</a>
<a href="https://wa.me/33652336156" target="_blank" rel="noreferrer" style={{background:"rgba(37,211,102,0.1)",border:"1px solid #25D36644",color:"#25D366",padding:"8px 18px",borderRadius:"6px",textDecoration:"none",fontSize:"12px",fontWeight:600}}>💬 Nous écrire sur WhatsApp</a>
</div>
</div>
</div>
</div>

{/* Footer */}
<footer style={{background:"#07070f",borderTop:"1px solid #1a1a2e",padding:"36px 24px",textAlign:"center",marginTop:"0"}}>
<div style={{marginBottom:"10px",display:"flex",justifyContent:"center"}}><MoonLogo size={38}/></div>
<p style={{color:"#D4A843",fontFamily:"'Playfair Display',serif",fontSize:"15px",marginBottom:"6px"}}>{SHOP_NAME}</p>
<p style={{color:"#2ecc71",fontSize:"11px",marginBottom:"12px"}}>🌙 Livraison nocturne 22h–6h · 91 · 94 · 77</p>
<div style={{display:"flex",justifyContent:"center",gap:"16px",marginBottom:"16px",flexWrap:"wrap"}}>
<button onClick={()=>setPage("contact")} style={{background:"transparent",border:"none",color:"#333",cursor:"pointer",fontFamily:"'DM Sans',sans-serif",fontSize:"11px",textDecoration:"underline"}}>Contact</button>
<span style={{color:"#1a1a2e"}}>|</span>
<button onClick={()=>setPage("tracking")} style={{background:"transparent",border:"none",color:"#333",cursor:"pointer",fontFamily:"'DM Sans',sans-serif",fontSize:"11px",textDecoration:"underline"}}>📦 Suivi commande</button>
<span style={{color:"#1a1a2e"}}>|</span>
<button onClick={()=>setPage("cgv")} style={{background:"transparent",border:"none",color:"#333",cursor:"pointer",fontFamily:"'DM Sans',sans-serif",fontSize:"11px",textDecoration:"underline"}}>CGV</button>
<span style={{color:"#1a1a2e"}}>|</span>
<span style={{color:"#333",fontSize:"11px"}}>Mentions légales</span>
</div>
<p style={{color:"#1a1a2e",fontSize:"10px",lineHeight:2}}>
L'abus d'alcool est dangereux pour la santé. À consommer avec modération.<br/>
Vente interdite aux mineurs de moins de 18 ans. · © 2026 {SHOP_NAME}
</p>
</footer>

{/* Cart */}
{cartOpen&&(
<div style={{position:"fixed",inset:0,zIndex:200}}>
<div onClick={()=>setCartOpen(false)} style={{position:"absolute",inset:0,background:"rgba(0,0,0,0.8)"}}/>
<div style={{position:"absolute",right:0,top:0,bottom:0,width:"min(390px,100vw)",background:"#0d0d1a",borderLeft:"1px solid #1a1a2e",display:"flex",flexDirection:"column",animation:"slideIn 0.3s ease"}}>
<div style={{padding:"18px 20px",borderBottom:"1px solid #1a1a2e",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
<h2 style={{fontFamily:"'Playfair Display',serif",fontSize:"17px"}}>Votre Panier</h2>
<button onClick={()=>setCartOpen(false)} style={{background:"none",border:"none",color:"#aaa",fontSize:"22px",cursor:"pointer"}}>×</button>
</div>
{zone?(<div style={{margin:"10px 16px 0",background:`${zone.color}10`,border:`1px solid ${zone.color}33`,borderRadius:"6px",padding:"9px 12px"}}>
<p style={{color:zone.color,fontSize:"11px",fontWeight:600}}>📍 {zone.label} · Min. {zone.minOrder} € · Gratuite dès 30 €</p>
</div>):(
<div onClick={()=>{setCartOpen(false);setShowZone(true);}} style={{margin:"10px 16px 0",background:"rgba(212,168,67,0.05)",border:"1px solid #D4A84333",borderRadius:"6px",padding:"9px 12px",cursor:"pointer"}}>
<p style={{color:"#D4A843",fontSize:"11px",fontWeight:600}}>📍 Choisir ma zone de livraison →</p>
</div>
)}
{!open&&<div style={{margin:"8px 16px 0",background:"rgba(230,126,34,0.06)",border:"1px solid #e67e2222",borderRadius:"6px",padding:"9px 12px"}}>
<p style={{color:"#e67e22",fontSize:"11px"}}>😴 Fermé — commandez maintenant, livré dès 22h</p>
</div>}
<div style={{flex:1,overflowY:"auto",padding:"12px 16px"}}>
{cart.length===0?<p style={{color:"#2a2a3a",textAlign:"center",marginTop:"40px"}}>Votre panier est vide</p>:cart.map(item=>(
<div key={item.id} style={{display:"flex",gap:"10px",padding:"11px 0",borderBottom:"1px solid #1a1a2e",alignItems:"center"}}>
<span style={{fontSize:"24px"}}>{item.emoji}</span>
<div style={{flex:1}}>
<p style={{fontWeight:600,fontSize:"12px",color:"#ddd"}}>{item.name}</p>
<p style={{color:"#D4A843",fontSize:"12px"}}>{(item.price*item.qty).toFixed(2)} €</p>
</div>
<div style={{display:"flex",alignItems:"center",gap:"5px"}}>
<button onClick={()=>updateQty(item.id,-1)} style={{background:"#1a1a2e",border:"1px solid #2a2a3e",color:"#fff",width:"22px",height:"22px",borderRadius:"3px",cursor:"pointer",fontSize:"12px"}}>−</button>
<span style={{fontSize:"12px",minWidth:"16px",textAlign:"center"}}>{item.qty}</span>
<button onClick={()=>updateQty(item.id,1)} style={{background:"#1a1a2e",border:"1px solid #2a2a3e",color:"#fff",width:"22px",height:"22px",borderRadius:"3px",cursor:"pointer",fontSize:"12px"}}>+</button>
<button onClick={()=>removeFromCart(item.id)} style={{background:"none",border:"none",color:"#2a2a3a",cursor:"pointer",fontSize:"13px",marginLeft:"2px"}}>🗑</button>
</div>
</div>
))}
</div>
{cart.length>0&&(
<div style={{padding:"14px 18px",borderTop:"1px solid #1a1a2e"}}>
<div style={{marginBottom:"10px",paddingBottom:"10px",borderBottom:"1px solid #1a1a2e"}}>
{appliedPromo?(
<div style={{display:"flex",justifyContent:"space-between",alignItems:"center",background:"rgba(46,204,113,0.08)",border:"1px solid #2ecc7133",borderRadius:"6px",padding:"8px 12px"}}>
<span style={{color:"#2ecc71",fontSize:"11px",fontWeight:600}}>🎁 {appliedPromo.label||`−${appliedPromo.discount}${appliedPromo.type==="percent"?"%":" €"}`}</span>
<button onClick={removePromo} style={{background:"none",border:"none",color:"#555",cursor:"pointer",fontSize:"13px"}}>✕</button>
</div>
):(
<div>
<div style={{display:"flex",gap:"6px"}}>
<input value={promoCode} onChange={e=>setPromoCode(e.target.value.toUpperCase())} placeholder="Code promo" style={{flex:1,padding:"8px 10px",background:"#111118",border:"1px solid #1a1a2e",borderRadius:"4px",color:"#fff",fontFamily:"'DM Sans',sans-serif",fontSize:"12px",outline:"none"}}/>
<button onClick={applyPromo} style={{background:"#D4A843",color:"#0a0a0a",border:"none",padding:"8px 12px",borderRadius:"4px",cursor:"pointer",fontFamily:"'DM Sans',sans-serif",fontSize:"11px",fontWeight:700}}>OK</button>
</div>
{promoError&&<p style={{color:"#e74c3c",fontSize:"10px",marginTop:"4px"}}>{promoError}</p>}
{promoSuccess&&<p style={{color:"#2ecc71",fontSize:"10px",marginTop:"4px"}}>{promoSuccess}</p>}
</div>
)}
</div>
<div style={{display:"flex",justifyContent:"space-between",marginBottom:"3px"}}><span style={{color:"#555",fontSize:"12px"}}>Sous-total</span><span style={{color:"#bbb",fontSize:"12px"}}>{subtotal.toFixed(2)} €</span></div>
{appliedPromo&&<div style={{display:"flex",justifyContent:"space-between",marginBottom:"3px"}}><span style={{color:"#2ecc71",fontSize:"12px"}}>🎁 Réduction</span><span style={{color:"#2ecc71",fontSize:"12px"}}>−{promoDiscount.toFixed(2)} €</span></div>}
<div style={{display:"flex",justifyContent:"space-between",marginBottom:"6px"}}><span style={{color:"#555",fontSize:"12px"}}>Livraison</span><span style={{color:deliveryFee===0?"#2ecc71":"#bbb",fontSize:"12px"}}>{deliveryFee===0?"Gratuite 🎉":`${deliveryFee.toFixed(2)} €`}</span></div>
{discountedSubtotal<30&&<p style={{color:"#2a2a3a",fontSize:"10px",marginBottom:"3px"}}>Encore {(30-discountedSubtotal).toFixed(2)} € pour la livraison gratuite</p>}
{zone&&!canOrder&&<p style={{color:"#e74c3c",fontSize:"10px",marginBottom:"6px"}}>⚠️ Min. {zone.minOrder} € pour {zone.label}</p>}
<div style={{display:"flex",justifyContent:"space-between",marginBottom:"12px",paddingTop:"8px",borderTop:"1px solid #1a1a2e"}}>
<span style={{color:"#aaa",fontWeight:600,fontSize:"13px"}}>Total</span>
<span style={{fontFamily:"'Playfair Display',serif",fontSize:"17px",color:"#D4A843"}}>{total.toFixed(2)} €</span>
</div>
<button onClick={()=>{if(!zone){setCartOpen(false);setShowZone(true);return;}if(!canOrder)return;setCartOpen(false);setCheckoutStep("form");}}
style={{width:"100%",background:(!zone||!canOrder)?"#1a1a2e":"#D4A843",color:(!zone||!canOrder)?"#444":"#0a0a0a",border:"none",padding:"12px",fontSize:"11px",fontWeight:700,letterSpacing:"2px",cursor:(!zone||!canOrder)?"not-allowed":"pointer",borderRadius:"4px",fontFamily:"'DM Sans',sans-serif"}}>
{!zone?"CHOISIR MA ZONE D'ABORD":!canOrder?`MIN. ${zone.minOrder} € REQUIS`:"COMMANDER →"}
</button>
</div>
)}
</div>
</div>
)}

{/* Checkout */}
{checkoutStep==="form"&&(
<div style={{position:"fixed",inset:0,zIndex:300,background:"rgba(0,0,0,0.92)",display:"flex",alignItems:"center",justifyContent:"center",padding:"16px"}}>
<div style={{background:"#0d0d1a",border:"1px solid #1a1a2e",borderRadius:"10px",padding:"30px",maxWidth:"460px",width:"100%",maxHeight:"90vh",overflowY:"auto"}}>
<div style={{display:"flex",alignItems:"center",gap:"10px",marginBottom:"18px"}}>
<MoonLogo size={24}/><h2 style={{fontFamily:"'Playfair Display',serif",fontSize:"18px",color:"#D4A843"}}>Finaliser la commande</h2>
</div>
{zone&&<div style={{background:`${zone.color}10`,border:`1px solid ${zone.color}33`,borderRadius:"6px",padding:"9px 14px",marginBottom:"14px"}}>
<p style={{color:zone.color,fontSize:"11px",fontWeight:600}}>📍 {zone.label} · 🌙 22h–6h · 🚚 {deliveryFee===0?"Livraison gratuite":`+${deliveryFee.toFixed(2)} €`}</p>
</div>}
<div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"8px",marginBottom:"8px"}}>
{[["Prénom","prenom"],["Nom","nom"],["Email","email"],["Téléphone","tel"],["Adresse complète","adresse"],["Ville","ville"],["Code postal","cp"]].map(([label,key])=>(
<input key={key} placeholder={label} value={form[key]} onChange={e=>setForm(f=>({...f,[key]:e.target.value}))}
style={{gridColumn:["Email","Adresse complète","Téléphone"].includes(label)?"span 2":"span 1",padding:"10px",background:"#111118",border:"1px solid #1a1a2e",borderRadius:"4px",color:"#fff",fontFamily:"'DM Sans',sans-serif",fontSize:"12px",outline:"none"}}/>
))}
</div>
<div style={{background:"#111118",border:"1px solid #1a1a2e",borderRadius:"4px",padding:"14px",marginBottom:"14px",marginTop:"6px"}}>
<p style={{color:"#333",fontSize:"9px",marginBottom:"8px",letterSpacing:"1px"}}>PAIEMENT SÉCURISÉ — STRIPE</p>
<input placeholder="Numéro de carte" style={{width:"100%",padding:"9px",background:"#0d0d1a",border:"1px solid #1a1a2e",borderRadius:"4px",color:"#fff",fontFamily:"'DM Sans',sans-serif",fontSize:"12px",outline:"none",marginBottom:"6px"}}/>
<div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"6px"}}>
<input placeholder="MM/AA" style={{padding:"9px",background:"#0d0d1a",border:"1px solid #1a1a2e",borderRadius:"4px",color:"#fff",fontFamily:"'DM Sans',sans-serif",fontSize:"12px",outline:"none"}}/>
<input placeholder="CVC" style={{padding:"9px",background:"#0d0d1a",border:"1px solid #1a1a2e",borderRadius:"4px",color:"#fff",fontFamily:"'DM Sans',sans-serif",fontSize:"12px",outline:"none"}}/>
</div>
</div>
<div style={{background:"#111118",borderRadius:"6px",padding:"10px 14px",marginBottom:"14px"}}>
<div style={{display:"flex",justifyContent:"space-between",marginBottom:"3px"}}><span style={{color:"#555",fontSize:"11px"}}>Sous-total</span><span style={{color:"#bbb",fontSize:"11px"}}>{subtotal.toFixed(2)} €</span></div>
{appliedPromo&&<div style={{display:"flex",justifyContent:"space-between",marginBottom:"3px"}}><span style={{color:"#2ecc71",fontSize:"11px"}}>🎁 Réduction</span><span style={{color:"#2ecc71",fontSize:"11px"}}>−{promoDiscount.toFixed(2)} €</span></div>}
<div style={{display:"flex",justifyContent:"space-between",marginBottom:"6px"}}><span style={{color:"#555",fontSize:"11px"}}>Livraison</span><span style={{color:deliveryFee===0?"#2ecc71":"#bbb",fontSize:"11px"}}>{deliveryFee===0?"Gratuite 🎉":`${deliveryFee.toFixed(2)} €`}</span></div>
<div style={{display:"flex",justifyContent:"space-between",paddingTop:"6px",borderTop:"1px solid #1a1a2e"}}>
<span style={{color:"#aaa",fontWeight:600,fontSize:"12px"}}>Total</span>
<span style={{fontFamily:"'Playfair Display',serif",fontSize:"17px",color:"#D4A843",fontWeight:700}}>{total.toFixed(2)} €</span>
</div>
</div>
<button onClick={confirmOrder} style={{width:"100%",background:"#D4A843",color:"#0a0a0a",border:"none",padding:"12px",fontSize:"11px",fontWeight:700,letterSpacing:"2px",cursor:"pointer",borderRadius:"4px",marginBottom:"8px",fontFamily:"'DM Sans',sans-serif"}}>PAYER {total.toFixed(2)} € →</button>
<button onClick={()=>setCheckoutStep(null)} style={{width:"100%",background:"none",border:"none",color:"#444",cursor:"pointer",fontFamily:"'DM Sans',sans-serif",fontSize:"11px"}}>← Retour</button>
</div>
</div>
)}

{checkoutStep==="success"&&(
<div style={{position:"fixed",inset:0,zIndex:300,background:"rgba(0,0,0,0.95)",display:"flex",alignItems:"center",justifyContent:"center"}}>
<div style={{textAlign:"center",padding:"40px",maxWidth:"360px"}}>
<div style={{marginBottom:"14px",display:"flex",justifyContent:"center"}}><MoonLogo size={60}/></div>
<h2 style={{fontFamily:"'Playfair Display',serif",fontSize:"24px",color:"#D4A843",marginBottom:"10px"}}>Commande confirmée !</h2>
<p style={{color:"#888",marginBottom:"6px",fontSize:"13px"}}>Merci pour votre commande.</p>
<p style={{color:"#2ecc71",fontSize:"12px",marginBottom:"4px"}}>🌙 Livraison cette nuit entre 22h et 6h</p>
{zone&&<p style={{color:"#555",fontSize:"11px",marginBottom:"4px"}}>📍 {zone.label} — Dép. {zone.dept.join(", ")}</p>}
<p style={{color:"#333",fontSize:"11px",marginBottom:"26px"}}>Un SMS de confirmation vous sera envoyé.</p>
<button onClick={()=>{setCheckoutStep(null);setPage("tracking");}} style={{background:"transparent",border:"1px solid #D4A843",color:"#D4A843",border:"1px solid #D4A84355",padding:"10px 24px",fontSize:"11px",fontWeight:700,letterSpacing:"1px",cursor:"pointer",borderRadius:"4px",fontFamily:"'DM Sans',sans-serif",marginBottom:"10px",width:"100%"}}>📦 SUIVRE MA COMMANDE</button>
<button onClick={()=>setCheckoutStep(null)} style={{background:"#D4A843",color:"#0a0a0a",border:"none",padding:"12px 28px",fontSize:"11px",fontWeight:700,letterSpacing:"2px",cursor:"pointer",borderRadius:"4px",fontFamily:"'DM Sans',sans-serif"}}>RETOUR À LA BOUTIQUE</button>
</div>
</div>
)}

{/* WhatsApp */}
<a href="https://wa.me/33652336156?text=Bonjour%20Le%20Keïsen%20Night%2C%20je%20voudrais%20passer%20commande%20🌙" target="_blank" rel="noreferrer"
style={{position:"fixed",bottom:"24px",right:"24px",zIndex:500,background:"#25D366",borderRadius:"50%",width:"56px",height:"56px",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 4px 20px rgba(37,211,102,0.4)",textDecoration:"none",animation:"waFloat 3s ease-in-out infinite"}}
onMouseOver={e=>{e.currentTarget.style.transform="scale(1.1)";}} onMouseOut={e=>{e.currentTarget.style.transform="scale(1)";}}>
<svg width="26" height="26" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
</a>
</div>
);
}

// ─── CONTACT & CGV (pages internes boutique) ─────────────────
const TrackingPage = ({orders, onClose}) => {
const [searchId, setSearchId] = useState("");
const [searchPhone, setSearchPhone] = useState("");
const [result, setResult] = useState(null);
const [searched, setSearched] = useState(false);

const STATUS_STEPS = ["en attente", "en cours", "livré"];

const handleSearch = () => {
if (!searchId && !searchPhone) return;
const found = orders.find(o =>
(searchId && o.id.toLowerCase() === searchId.trim().toLowerCase()) ||
(searchPhone && o.phone.replace(/\s/g,"").includes(searchPhone.replace(/\s/g,"")))
);
setResult(found || null);
setSearched(true);
};

const getStepIndex = (status) => {
if (status === "annulé") return -1;
return STATUS_STEPS.indexOf(status);
};

const stepIndex = result ? getStepIndex(result.status) : -1;

const STEP_INFO = [
{ icon: "✅", label: "Commande reçue", desc: "Votre commande a été confirmée" },
{ icon: "🛵", label: "En livraison", desc: "Le livreur est en route vers vous" },
{ icon: "🌙", label: "Livré", desc: "Votre commande a été livrée" },
];

return (
<div style={{position:"fixed",inset:0,zIndex:300,background:"#0a0a12",overflowY:"auto"}}>
<div style={{maxWidth:"600px",margin:"0 auto",padding:"40px 24px"}}>
<button onClick={onClose} style={{background:"none",border:"1px solid #1a1a2e",color:"#aaa",padding:"8px 16px",borderRadius:"4px",cursor:"pointer",fontFamily:"'DM Sans',sans-serif",fontSize:"12px",marginBottom:"32px"}}>← Retour</button>

{/* Header */}
<div style={{textAlign:"center",marginBottom:"36px"}}>
<div style={{fontSize:"48px",marginBottom:"12px"}}>📦</div>
<h1 style={{fontFamily:"'Playfair Display',serif",fontSize:"26px",color:"#D4A843",marginBottom:"6px"}}>Suivi de commande</h1>
<p style={{color:"#555",fontSize:"13px"}}>Entrez votre numéro de commande ou votre téléphone</p>
</div>

{/* Search */}
<div style={{background:"#111118",border:"1px solid #1a1a2e",borderRadius:"10px",padding:"24px",marginBottom:"24px"}}>
<div style={{marginBottom:"12px"}}>
<label style={{color:"#555",fontSize:"10px",letterSpacing:"2px",display:"block",marginBottom:"6px"}}>NUMÉRO DE COMMANDE</label>
<input value={searchId} onChange={e=>setSearchId(e.target.value.toUpperCase())} placeholder="Ex : KN-001"
style={{width:"100%",padding:"12px",background:"#0d0d1a",border:"1px solid #1a1a2e",borderRadius:"6px",color:"#fff",fontFamily:"'DM Sans',sans-serif",fontSize:"13px",outline:"none"}}
onKeyDown={e=>e.key==="Enter"&&handleSearch()}/>
</div>
<div style={{display:"flex",alignItems:"center",gap:"10px",marginBottom:"12px"}}>
<div style={{flex:1,height:"1px",background:"#1a1a2e"}}/>
<span style={{color:"#333",fontSize:"11px"}}>OU</span>
<div style={{flex:1,height:"1px",background:"#1a1a2e"}}/>
</div>
<div style={{marginBottom:"16px"}}>
<label style={{color:"#555",fontSize:"10px",letterSpacing:"2px",display:"block",marginBottom:"6px"}}>NUMÉRO DE TÉLÉPHONE</label>
<input value={searchPhone} onChange={e=>setSearchPhone(e.target.value)} placeholder="Ex : 06 52 33 61 56"
style={{width:"100%",padding:"12px",background:"#0d0d1a",border:"1px solid #1a1a2e",borderRadius:"6px",color:"#fff",fontFamily:"'DM Sans',sans-serif",fontSize:"13px",outline:"none"}}
onKeyDown={e=>e.key==="Enter"&&handleSearch()}/>
</div>
<button onClick={handleSearch} style={{width:"100%",background:"#D4A843",color:"#0a0a0a",border:"none",padding:"13px",borderRadius:"6px",cursor:"pointer",fontFamily:"'DM Sans',sans-serif",fontSize:"12px",fontWeight:700,letterSpacing:"2px"}}>
RECHERCHER MA COMMANDE →
</button>
</div>

{/* Not found */}
{searched && !result && (
<div style={{background:"rgba(231,76,60,0.08)",border:"1px solid #e74c3c33",borderRadius:"10px",padding:"24px",textAlign:"center",animation:"slideIn 0.3s ease"}}>
<p style={{fontSize:"32px",marginBottom:"10px"}}>😕</p>
<p style={{color:"#e74c3c",fontWeight:700,fontSize:"14px",marginBottom:"6px"}}>Commande introuvable</p>
<p style={{color:"#666",fontSize:"12px"}}>Vérifiez votre numéro de commande ou téléphone.</p>
<p style={{color:"#555",fontSize:"12px",marginTop:"8px"}}>Besoin d'aide ? <a href="https://wa.me/33652336156" target="_blank" rel="noreferrer" style={{color:"#25D366",textDecoration:"none"}}>Contactez-nous sur WhatsApp</a></p>
</div>
)}

{/* Result */}
{result && (
<div style={{animation:"slideIn 0.3s ease"}}>
{/* Status card */}
<div style={{background:"#111118",border:`1px solid ${result.status==="annulé"?"#e74c3c33":"#D4A84333"}`,borderRadius:"10px",padding:"24px",marginBottom:"16px"}}>
<div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:"16px",flexWrap:"wrap",gap:"8px"}}>
<div>
<p style={{color:"#D4A843",fontWeight:700,fontSize:"16px",marginBottom:"2px"}}>{result.id}</p>
<p style={{color:"#555",fontSize:"12px"}}>Passée le {result.date} à {result.time}</p>
</div>
{result.status === "annulé" ? (
<span style={{background:"rgba(231,76,60,0.12)",color:"#e74c3c",border:"1px solid #e74c3c33",padding:"5px 14px",borderRadius:"8px",fontSize:"12px",fontWeight:700}}>ANNULÉE</span>
) : (
<span style={{background:"rgba(46,204,113,0.12)",color:"#2ecc71",border:"1px solid #2ecc7133",padding:"5px 14px",borderRadius:"8px",fontSize:"12px",fontWeight:700}}>
{result.status === "livré" ? "✅ LIVRÉE" : "🔄 EN COURS"}
</span>
)}
</div>

{/* Progress bar */}
{result.status !== "annulé" && (
<div style={{marginBottom:"20px"}}>
<div style={{display:"flex",justifyContent:"space-between",position:"relative",marginBottom:"8px"}}>
{/* Progress line */}
<div style={{position:"absolute",top:"16px",left:"16px",right:"16px",height:"2px",background:"#1a1a2e",zIndex:0}}/>
<div style={{position:"absolute",top:"16px",left:"16px",height:"2px",background:"#D4A843",zIndex:1,transition:"width 0.8s ease",width:`${stepIndex===0?"0%":stepIndex===1?"50%":"100%"}`}}/>
{STEP_INFO.map((step,i)=>(
<div key={i} style={{display:"flex",flexDirection:"column",alignItems:"center",gap:"6px",zIndex:2,flex:1}}>
<div style={{width:"32px",height:"32px",borderRadius:"50%",background:i<=stepIndex?"#D4A843":"#1a1a2e",border:`2px solid ${i<=stepIndex?"#D4A843":"#2a2a3e"}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"14px",transition:"all 0.5s"}}>
{i<=stepIndex?step.icon:<span style={{color:"#333",fontSize:"10px"}}>{i+1}</span>}
</div>
<p style={{color:i<=stepIndex?"#D4A843":"#333",fontSize:"10px",fontWeight:i<=stepIndex?700:400,textAlign:"center",maxWidth:"80px"}}>{step.label}</p>
</div>
))}
</div>
<p style={{color:"#666",fontSize:"12px",textAlign:"center",marginTop:"8px"}}>
{stepIndex===0 && "⏳ Votre commande est confirmée, le livreur va bientôt partir."}
{stepIndex===1 && "🛵 Le livreur est en route ! Restez disponible à votre adresse."}
{stepIndex===2 && "🎉 Votre commande a été livrée. Bonne soirée !"}
</p>
</div>
)}

{result.status === "annulé" && (
<p style={{color:"#e74c3c",fontSize:"13px",marginBottom:"16px"}}>Cette commande a été annulée. Pour toute question, contactez-nous sur WhatsApp.</p>
)}

{/* Order details */}
<div style={{borderTop:"1px solid #1a1a2e",paddingTop:"16px"}}>
<div style={{display:"flex",flexDirection:"column",gap:"8px",marginBottom:"12px"}}>
<div style={{display:"flex",justifyContent:"space-between"}}>
<span style={{color:"#555",fontSize:"12px"}}>Client</span>
<span style={{color:"#ccc",fontSize:"12px"}}>{result.client}</span>
</div>
<div style={{display:"flex",justifyContent:"space-between"}}>
<span style={{color:"#555",fontSize:"12px"}}>Adresse</span>
<span style={{color:"#ccc",fontSize:"12px",textAlign:"right",maxWidth:"200px"}}>{result.address}</span>
</div>
<div style={{display:"flex",justifyContent:"space-between"}}>
<span style={{color:"#555",fontSize:"12px"}}>Zone</span>
<span style={{color:"#ccc",fontSize:"12px"}}>{result.zone}</span>
</div>
{result.promo && (
<div style={{display:"flex",justifyContent:"space-between"}}>
<span style={{color:"#555",fontSize:"12px"}}>Code promo</span>
<span style={{color:"#9b59b6",fontSize:"12px",fontWeight:600}}>🎁 {result.promo}</span>
</div>
)}
</div>
<p style={{color:"#444",fontSize:"10px",letterSpacing:"2px",marginBottom:"8px"}}>ARTICLES :</p>
{result.items.map(item=>(
<p key={item} style={{color:"#666",fontSize:"12px",lineHeight:1.8}}>• {item}</p>
))}
<div style={{display:"flex",justifyContent:"space-between",marginTop:"12px",paddingTop:"12px",borderTop:"1px solid #1a1a2e"}}>
<span style={{color:"#888",fontWeight:600}}>Total payé</span>
<span style={{fontFamily:"'Playfair Display',serif",fontSize:"20px",color:"#D4A843",fontWeight:700}}>{result.total.toFixed(2)} €</span>
</div>
</div>
</div>

{/* Help */}
<div style={{background:"rgba(37,211,102,0.05)",border:"1px solid #25D36622",borderRadius:"10px",padding:"18px",display:"flex",alignItems:"center",gap:"14px"}}>
<span style={{fontSize:"28px"}}>💬</span>
<div>
<p style={{color:"#ccc",fontSize:"13px",fontWeight:600,marginBottom:"3px"}}>Un problème avec votre commande ?</p>
<a href="https://wa.me/33652336156" target="_blank" rel="noreferrer" style={{color:"#25D366",fontSize:"12px",textDecoration:"none",fontWeight:600}}>Contactez-nous sur WhatsApp → 06 52 33 61 56</a>
</div>
</div>
</div>
)}
</div>
</div>
);
};

const ContactPageShop = ({onClose}) => (
<div style={{position:"fixed",inset:0,zIndex:300,background:"#0a0a12",overflowY:"auto"}}>
<div style={{maxWidth:"600px",margin:"0 auto",padding:"40px 24px"}}>
<button onClick={onClose} style={{background:"none",border:"1px solid #1a1a2e",color:"#aaa",padding:"8px 16px",borderRadius:"4px",cursor:"pointer",fontFamily:"'DM Sans',sans-serif",fontSize:"12px",marginBottom:"32px"}}>← Retour</button>
<div style={{textAlign:"center",marginBottom:"32px"}}><MoonLogo size={48}/><h1 style={{fontFamily:"'Playfair Display',serif",fontSize:"24px",color:"#D4A843",marginTop:"12px",marginBottom:"4px"}}>Le Keïsen Night</h1><p style={{color:"#444",fontSize:"10px",letterSpacing:"4px"}}>NOUS CONTACTER</p></div>
<div style={{background:"#111118",border:"1px solid #1a1a2e",borderRadius:"10px",padding:"22px",marginBottom:"16px"}}>
<h3 style={{fontFamily:"'Playfair Display',serif",fontSize:"15px",color:"#D4A843",marginBottom:"14px"}}>📞 Nous joindre</h3>
{[{icon:"📱",label:"Téléphone / WhatsApp",value:"06 52 33 61 56",color:"#25D366"},{icon:"📧",label:"Email",value:"Hostilesm@gmail.com",color:"#D4A843"},{icon:"📍",label:"Zone",value:"91 · 94 · 77 — Île-de-France",color:"#aaa"}].map(({icon,label,value,color})=>(
<div key={label} style={{display:"flex",alignItems:"center",gap:"12px",background:"#0d0d1a",borderRadius:"8px",padding:"12px",marginBottom:"8px"}}>
<span style={{fontSize:"22px"}}>{icon}</span>
<div><p style={{color:"#444",fontSize:"10px",marginBottom:"2px"}}>{label}</p><p style={{color,fontSize:"13px",fontWeight:600}}>{value}</p></div>
</div>
))}
</div>
<div style={{background:"#111118",border:"1px solid #1a1a2e",borderRadius:"10px",padding:"22px",marginBottom:"16px"}}>
<h3 style={{fontFamily:"'Playfair Display',serif",fontSize:"15px",color:"#D4A843",marginBottom:"14px"}}>📲 Réseaux sociaux</h3>
<div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"10px"}}>
{[{icon:"📸",name:"Instagram",handle:"@Lekeisen_night",color:"#E1306C",bg:"rgba(225,48,108,0.08)"},{icon:"🎵",name:"TikTok",handle:"@Lekeisen_night",color:"#69C9D0",bg:"rgba(105,201,208,0.08)"},{icon:"💬",name:"WhatsApp",handle:"Commandes rapides",color:"#25D366",bg:"rgba(37,211,102,0.08)"},{icon:"📘",name:"Facebook",handle:"Le Keïsen Night",color:"#1877F2",bg:"rgba(24,119,242,0.08)"}].map(({icon,name,handle,color,bg})=>(
<div key={name} style={{background:bg,border:`1px solid ${color}33`,borderRadius:"8px",padding:"14px",textAlign:"center",cursor:"pointer"}} onMouseOver={e=>e.currentTarget.style.borderColor=color} onMouseOut={e=>e.currentTarget.style.borderColor=`${color}33`}>
<div style={{fontSize:"26px",marginBottom:"4px"}}>{icon}</div>
<p style={{color,fontWeight:700,fontSize:"12px"}}>{name}</p>
<p style={{color:"#444",fontSize:"10px",marginTop:"2px"}}>{handle}</p>
</div>
))}
</div>
</div>
<div style={{background:"#111118",border:"1px solid #1a1a2e",borderRadius:"10px",padding:"22px"}}>
<h3 style={{fontFamily:"'Playfair Display',serif",fontSize:"15px",color:"#D4A843",marginBottom:"14px"}}>✉️ Envoyer un message</h3>
<div style={{display:"flex",flexDirection:"column",gap:"8px"}}>
<input placeholder="Votre nom" style={{padding:"11px",background:"#0d0d1a",border:"1px solid #1a1a2e",borderRadius:"4px",color:"#fff",fontFamily:"'DM Sans',sans-serif",fontSize:"12px",outline:"none"}}/>
<input placeholder="Votre email ou téléphone" style={{padding:"11px",background:"#0d0d1a",border:"1px solid #1a1a2e",borderRadius:"4px",color:"#fff",fontFamily:"'DM Sans',sans-serif",fontSize:"12px",outline:"none"}}/>
<textarea placeholder="Votre message..." rows={4} style={{padding:"11px",background:"#0d0d1a",border:"1px solid #1a1a2e",borderRadius:"4px",color:"#fff",fontFamily:"'DM Sans',sans-serif",fontSize:"12px",outline:"none",resize:"vertical"}}/>
<button style={{background:"#D4A843",color:"#0a0a0a",border:"none",padding:"12px",fontSize:"11px",fontWeight:700,letterSpacing:"2px",cursor:"pointer",borderRadius:"4px",fontFamily:"'DM Sans',sans-serif"}}>ENVOYER →</button>
</div>
</div>
</div>
</div>
);

const CGVPageShop = ({onClose}) => (
<div style={{position:"fixed",inset:0,zIndex:300,background:"#0a0a12",overflowY:"auto"}}>
<div style={{maxWidth:"760px",margin:"0 auto",padding:"40px 24px"}}>
<button onClick={onClose} style={{background:"none",border:"1px solid #1a1a2e",color:"#aaa",padding:"8px 16px",borderRadius:"4px",cursor:"pointer",fontFamily:"'DM Sans',sans-serif",fontSize:"12px",marginBottom:"28px"}}>← Retour</button>
<div style={{textAlign:"center",marginBottom:"36px",paddingBottom:"24px",borderBottom:"1px solid #1a1a2e"}}>
<MoonLogo size={44}/><h1 style={{fontFamily:"'Playfair Display',serif",fontSize:"24px",color:"#D4A843",marginTop:"10px",marginBottom:"4px"}}>Le Keïsen Night</h1>
<p style={{color:"#444",fontSize:"9px",letterSpacing:"4px",marginBottom:"12px"}}>CONDITIONS GÉNÉRALES DE VENTE</p>
<p style={{color:"#2a2a3a",fontSize:"11px"}}>Version du {new Date().toLocaleDateString('fr-FR')} — Livraison nocturne 22h–6h — 91 · 94 · 77</p>
</div>
{[
{num:"01",title:"PRÉSENTATION",content:["Le Keïsen Night est un service de livraison nocturne à domicile de boissons alcoolisées, non alcoolisées et de produits d'apéritif.","📱 Téléphone / WhatsApp : 06 52 33 61 56","📧 Email : Hostilesm@gmail.com","📍 Zone : Départements 91 · 94 · 77 — Île-de-France"]},
{num:"02",title:"CHAMP D'APPLICATION",content:["Les présentes CGV s'appliquent à toutes les commandes passées via le site ou WhatsApp. Toute commande implique l'acceptation pleine et entière des présentes CGV."]},
{num:"03",title:"CONDITION D'ÂGE — VENTE D'ALCOOL",alert:"⚠️ La vente d'alcool est strictement interdite aux personnes mineures (moins de 18 ans).",content:["Tout client doit confirmer avoir 18 ans ou plus avant de commander.","Le Keïsen Night peut demander une pièce d'identité à la livraison.","En cas de doute sur l'âge, le livreur peut refuser la livraison sans remboursement.","Réf. légales : Art. L. 3342-1 et L. 3353-3 du Code de la santé publique."]},
{num:"04",title:"COMMANDES",content:["Commandes via le site ou WhatsApp au 06 52 33 61 56.","🕙 Horaires : 22h00 – 06h00, 7j/7. Toute commande hors horaires sera traitée à l'ouverture suivante.","Toute commande est ferme dès confirmation par SMS ou WhatsApp."]},
{num:"05",title:"PRIX ET PAIEMENT",content:["Prix en euros TTC. Modifiables sans préavis.","🚚 Livraison offerte dès 30 € — 4,90 € en dessous.","Minimums : Zone 1 (91) → 20 € | Zone 2 (94) → 35 € | Zone 3 (77) → 55 €","Paiement : carte bancaire (Stripe), espèces, virement sur demande."]},
{num:"06",title:"LIVRAISON",content:["Zones : 91 (Essonne), 94 (Val-de-Marne), 77 (Seine-et-Marne).","Délai estimé : 30 à 60 minutes (indicatif).","Le client doit être présent. Absence > 10 min = commande annulée sans remboursement.","Le livreur peut refuser la livraison à toute personne en état d'ivresse."]},
{num:"07",title:"DROIT DE RÉTRACTATION",content:["Conformément à l'art. L. 221-28 du Code de la consommation, le droit de rétractation ne s'applique pas aux produits périssables.","Tout litige doit être signalé dans les 24h suivant la livraison."]},
{num:"08",title:"DONNÉES PERSONNELLES (RGPD)",content:["Les données collectées sont utilisées uniquement pour traiter les commandes. Elles ne sont ni vendues ni transmises à des tiers.","Contact RGPD : Hostilesm@gmail.com"]},
{num:"09",title:"LITIGES ET DROIT APPLICABLE",content:["CGV soumises au droit français. Résolution amiable prioritaire.","Contact : Hostilesm@gmail.com · WhatsApp 06 52 33 61 56"]},
].map(article=>(
<div key={article.num} style={{marginBottom:"28px",paddingBottom:"28px",borderBottom:"1px solid #1a1a2e"}}>
<div style={{display:"flex",alignItems:"center",gap:"10px",marginBottom:"12px"}}>
<span style={{background:"rgba(212,168,67,0.1)",border:"1px solid #D4A84444",color:"#D4A843",fontSize:"10px",fontWeight:700,padding:"3px 10px",borderRadius:"6px",letterSpacing:"2px"}}>ART. {article.num}</span>
<h2 style={{fontFamily:"'Playfair Display',serif",fontSize:"15px",fontWeight:700,color:"#fff"}}>{article.title}</h2>
</div>
{article.alert&&<div style={{background:"rgba(231,76,60,0.08)",border:"1px solid #e74c3c33",borderRadius:"6px",padding:"10px 14px",marginBottom:"10px"}}><p style={{color:"#e74c3c",fontSize:"12px",fontWeight:600}}>{article.alert}</p></div>}
{article.content.map((line,i)=><p key={i} style={{color:"#666",fontSize:"12px",lineHeight:1.8,marginBottom:"4px",paddingLeft:"10px",borderLeft:"2px solid #1a1a2e"}}>{line}</p>)}
</div>
))}
<div style={{textAlign:"center",padding:"20px",background:"rgba(212,168,67,0.04)",border:"1px solid #D4A84422",borderRadius:"10px"}}>
<p style={{color:"#333",fontSize:"11px",lineHeight:2}}>L'abus d'alcool est dangereux pour la santé. À consommer avec modération.<br/>Vente interdite aux mineurs de moins de 18 ans. · © 2026 Le Keïsen Night</p>
</div>
</div>
</div>
);

// ════════════════════════════════════════════════════════════
// ADMIN
// ════════════════════════════════════════════════════════════
const LoginPage = ({onLogin}) => {
const [pw,setPw]=useState(""); const [err,setErr]=useState(""); const [shake,setShake]=useState(false);
const handle=()=>{ if(pw===ADMIN_PASSWORD){onLogin();}else{setErr("Mot de passe incorrect ❌");setShake(true);setTimeout(()=>setShake(false),500);}};
return (
<div style={{minHeight:"100vh",background:"radial-gradient(ellipse at top,#0d1a2e,#0a0a12)",display:"flex",alignItems:"center",justifyContent:"center"}}>
<div style={{background:"linear-gradient(135deg,rgba(13,26,46,0.97),rgba(10,10,18,0.98))",border:"1px solid #D4A84333",borderRadius:"12px",padding:"48px 44px",maxWidth:"380px",width:"90%",textAlign:"center",boxShadow:"0 40px 80px rgba(0,0,0,0.8)"}}>
<div style={{marginBottom:"16px",animation:"moonFloat 4s ease-in-out infinite"}}><MoonLogo size={52}/></div>
<h1 style={{fontFamily:"'Playfair Display',serif",fontSize:"20px",color:"#D4A843",marginBottom:"4px"}}>{SHOP_NAME}</h1>
<p style={{color:"#333",fontSize:"9px",letterSpacing:"4px",marginBottom:"28px"}}>ADMIN</p>
<div style={{animation:shake?"shake 0.4s ease":"none"}}>
<input type="password" value={pw} onChange={e=>setPw(e.target.value)} onKeyDown={e=>e.key==="Enter"&&handle()} placeholder="Mot de passe"
style={{width:"100%",padding:"13px",background:"#111118",border:`1px solid ${err?"#e74c3c":"#1a1a2e"}`,borderRadius:"6px",color:"#fff",fontFamily:"'DM Sans',sans-serif",fontSize:"14px",outline:"none",marginBottom:"10px",textAlign:"center",letterSpacing:"4px"}}/>
{err&&<p style={{color:"#e74c3c",fontSize:"12px",marginBottom:"10px"}}>{err}</p>}
<button onClick={handle} style={{width:"100%",background:"#D4A843",color:"#0a0a0a",border:"none",padding:"13px",borderRadius:"6px",cursor:"pointer",fontFamily:"'DM Sans',sans-serif",fontSize:"12px",fontWeight:700,letterSpacing:"2px"}}>ACCÉDER →</button>
</div>
</div>
</div>
);
};

function Admin({products:productsProp,setProducts,promos:promosProp,setPromos,orders:ordersProp,setOrders}) {
const [adminLoggedIn,setAdminLoggedIn]=useState(false);
const [tab,setTab]=useState("stats");
const [orderFilter,setOrderFilter]=useState("tous");
const [editProduct,setEditProduct]=useState(null);
const [editPromo,setEditPromo]=useState(null);
const [newPromo,setNewPromo]=useState(false);
const [selectedOrder,setSelectedOrder]=useState(null);
const [searchProduct,setSearchProduct]=useState("");
const [notification,setNotification]=useState(null);
const [newProductModal,setNewProductModal]=useState(false);
const [newProduct,setNewProduct]=useState({name:"",category:"biere",price:"",stock:"",emoji:"🍺",active:true});

const notify=(msg,type="success")=>{setNotification({msg,type});setTimeout(()=>setNotification(null),3000);};

const updateOrderStatus=(id,status)=>{setOrders(prev=>prev.map(o=>o.id===id?{...o,status}:o));notify(`Commande ${id} → ${status}`);setSelectedOrder(null);};
const saveProduct=(updated)=>{setProducts(prev=>prev.map(p=>p.id===updated.id?updated:p));setEditProduct(null);notify("Produit mis à jour ✓");};
const addProduct=()=>{
if(!newProduct.name||!newProduct.price)return;
const id=Math.max(...productsProp.map(p=>p.id))+1;
setProducts(prev=>[...prev,{...newProduct,id,price:parseFloat(newProduct.price),stock:parseInt(newProduct.stock)||0}]);
setNewProductModal(false);setNewProduct({name:"",category:"biere",price:"",stock:"",emoji:"🍺",active:true});notify("Produit ajouté ✓");
};
const toggleProduct=(id)=>{setProducts(prev=>prev.map(p=>p.id===id?{...p,active:!p.active}:p));notify("Produit mis à jour ✓");};
const savePromo=(updated)=>{
if(updated.isNew){const{isNew,...promo}=updated;setPromos(prev=>[...prev,{...promo,uses:0}]);notify("Code promo créé ✓");}
else{setPromos(prev=>prev.map(p=>p.code===updated.code?updated:p));notify("Code promo mis à jour ✓");}
setEditPromo(null);setNewPromo(false);
};
const togglePromo=(code)=>{setPromos(prev=>prev.map(p=>p.code===code?{...p,active:!p.active}:p));notify("Code promo mis à jour ✓");};
const deletePromo=(code)=>{setPromos(prev=>prev.filter(p=>p.code!==code));notify("Code supprimé","error");};

if(!adminLoggedIn) return <LoginPage onLogin={()=>setAdminLoggedIn(true)}/>;

const filteredOrders=orderFilter==="tous"?ordersProp:ordersProp.filter(o=>o.status===orderFilter);
const filteredProducts=productsProp.filter(p=>p.name.toLowerCase().includes(searchProduct.toLowerCase()));
const activeOrders=ordersProp.filter(o=>o.status==="en cours"||o.status==="en attente").length;
const lowStock=productsProp.filter(p=>p.stock<=5).length;
const totalRevenue=ordersProp.filter(o=>o.status==="livré").reduce((s,o)=>s+o.total,0);
const avgBasket=ordersProp.length?ordersProp.reduce((s,o)=>s+o.total,0)/ordersProp.length:0;

const TABS=[{id:"stats",label:"📊 Stats"},{id:"orders",label:`🌙 Commandes${activeOrders>0?` (${activeOrders})`:""}`},{id:"products",label:"📦 Produits"},{id:"promos",label:"🎁 Promos"}];

return (
<div style={{minHeight:"100vh",background:"#0a0a12",fontFamily:"'DM Sans',sans-serif",color:"#fff"}}>
{notification&&<div style={{position:"fixed",bottom:"24px",left:"50%",transform:"translateX(-50%)",zIndex:1000,background:notification.type==="error"?"#e74c3c":"#2ecc71",color:"#0a0a0a",padding:"12px 24px",borderRadius:"8px",fontSize:"13px",fontWeight:700,animation:"notif 3s ease forwards",boxShadow:"0 8px 32px rgba(0,0,0,0.4)"}}>{notification.msg}</div>}

<header style={{background:"rgba(10,10,18,0.98)",borderBottom:"1px solid #1a1a2e",padding:"0 24px",display:"flex",alignItems:"center",justifyContent:"space-between",height:"60px",position:"sticky",top:0,zIndex:100}}>
<div style={{display:"flex",alignItems:"center",gap:"10px"}}><MoonLogo size={28}/>
<div><div style={{fontFamily:"'Playfair Display',serif",fontSize:"15px",fontWeight:900,color:"#D4A843"}}>Le Keïsen Night</div><div style={{fontSize:"8px",color:"#333",letterSpacing:"3px"}}>ADMIN DASHBOARD</div></div>
</div>
<div style={{display:"flex",alignItems:"center",gap:"12px"}}>
{lowStock>0&&<div style={{background:"rgba(231,76,60,0.1)",border:"1px solid #e74c3c33",borderRadius:"6px",padding:"4px 10px"}}><span style={{color:"#e74c3c",fontSize:"11px",fontWeight:600}}>⚠️ {lowStock} stock{lowStock>1?"s":""} faible{lowStock>1?"s":""}</span></div>}
<div style={{display:"flex",alignItems:"center",gap:"6px"}}><div style={{width:"6px",height:"6px",borderRadius:"50%",background:"#2ecc71",animation:"pulse 2s infinite"}}/><span style={{fontSize:"11px",color:"#2ecc71",fontWeight:600}}>EN LIGNE</span></div>
<button onClick={()=>setAdminLoggedIn(false)} style={{background:"transparent",border:"1px solid #1a1a2e",color:"#444",padding:"6px 12px",borderRadius:"4px",cursor:"pointer",fontFamily:"'DM Sans',sans-serif",fontSize:"11px"}}>Déconnexion</button>
</div>
</header>

<div style={{background:"#0d0d1a",borderBottom:"1px solid #1a1a2e",padding:"0 24px",display:"flex",gap:"4px"}}>
{TABS.map(t=><button key={t.id} className="tab-btn" onClick={()=>setTab(t.id)} style={{background:"none",border:"none",borderBottom:`2px solid ${tab===t.id?"#D4A843":"transparent"}`,padding:"13px 16px",cursor:"pointer",fontFamily:"'DM Sans',sans-serif",fontSize:"11px",fontWeight:600,color:tab===t.id?"#D4A843":"#444",letterSpacing:"1px",transition:"color 0.2s"}}>{t.label}</button>)}
</div>

<div style={{padding:"20px 24px",maxWidth:"1200px",margin:"0 auto"}}>

{tab==="stats"&&(
<div style={{animation:"slideIn 0.3s ease"}}>
<div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))",gap:"12px",marginBottom:"20px"}}>
{[
{label:"CA livré",value:`${totalRevenue.toFixed(2)} €`,icon:"💰",color:"#D4A843",sub:"Commandes livrées"},
{label:"Commandes",value:ordersProp.length,icon:"🌙",color:"#3498db",sub:`${activeOrders} en cours`},
{label:"Panier moyen",value:`${avgBasket.toFixed(2)} €`,icon:"🛒",color:"#9b59b6",sub:"Par commande"},
{label:"Produits actifs",value:productsProp.filter(p=>p.active).length,icon:"📦",color:"#2ecc71",sub:`${lowStock} stock faible`},
].map(kpi=>(
<div key={kpi.label} style={{background:"#111118",border:"1px solid #1a1a2e",borderRadius:"10px",padding:"18px"}}>
<div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:"8px"}}>
<span style={{fontSize:"22px"}}>{kpi.icon}</span>
<span style={{fontSize:"10px",color:kpi.color,background:`${kpi.color}15`,padding:"2px 8px",borderRadius:"6px"}}>{kpi.sub}</span>
</div>
<p style={{color:"#444",fontSize:"10px",marginBottom:"4px",letterSpacing:"1px"}}>{kpi.label.toUpperCase()}</p>
<p style={{fontFamily:"'Playfair Display',serif",fontSize:"22px",fontWeight:700,color:kpi.color}}>{kpi.value}</p>
</div>
))}
</div>
<div style={{background:"#111118",border:"1px solid #1a1a2e",borderRadius:"10px",padding:"20px",marginBottom:"14px"}}>
<p style={{color:"#D4A843",fontSize:"9px",letterSpacing:"3px",marginBottom:"14px"}}>RÉPARTITION DES COMMANDES PAR STATUT</p>
<div style={{display:"flex",gap:"10px",flexWrap:"wrap"}}>
{["livré","en cours","en attente","annulé"].map(s=>{
const sc=STATUS_COLORS[s]; const count=ordersProp.filter(o=>o.status===s).length;
return <div key={s} style={{background:sc.bg,border:`1px solid ${sc.border}`,borderRadius:"8px",padding:"12px 16px",textAlign:"center",minWidth:"100px"}}>
<p style={{color:sc.color,fontSize:"20px",fontWeight:700}}>{count}</p>
<p style={{color:sc.color,fontSize:"10px",textTransform:"capitalize",marginTop:"2px"}}>{s}</p>
</div>;
})}
</div>
</div>
<div style={{background:"#111118",border:"1px solid #1a1a2e",borderRadius:"10px",padding:"20px"}}>
<p style={{color:"#D4A843",fontSize:"9px",letterSpacing:"3px",marginBottom:"14px"}}>DERNIÈRES COMMANDES</p>
{ordersProp.slice(0,4).map(o=>{
const sc=STATUS_COLORS[o.status];
return <div key={o.id} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 0",borderBottom:"1px solid #0d0d1a"}}>
<div><p style={{color:"#D4A843",fontSize:"12px",fontWeight:700}}>{o.id} — {o.client}</p><p style={{color:"#444",fontSize:"11px"}}>{o.time} · {o.zone}</p></div>
<div style={{display:"flex",alignItems:"center",gap:"10px"}}>
<span style={{background:sc.bg,color:sc.color,border:`1px solid ${sc.border}`,fontSize:"9px",fontWeight:700,padding:"2px 8px",borderRadius:"6px"}}>{o.status.toUpperCase()}</span>
<span style={{fontFamily:"'Playfair Display',serif",color:"#D4A843",fontSize:"15px",fontWeight:700}}>{o.total.toFixed(2)} €</span>
</div>
</div>;
})}
</div>
</div>
)}

{tab==="orders"&&(
<div style={{animation:"slideIn 0.3s ease"}}>
<div style={{display:"flex",gap:"8px",marginBottom:"14px",flexWrap:"wrap"}}>
{["tous","en attente","en cours","livré","annulé"].map(f=>(
<button key={f} onClick={()=>setOrderFilter(f)} style={{padding:"6px 14px",borderRadius:"16px",cursor:"pointer",background:orderFilter===f?"#D4A843":"transparent",color:orderFilter===f?"#0a0a0a":"#444",border:`1px solid ${orderFilter===f?"#D4A843":"#1a1a2e"}`,fontFamily:"'DM Sans',sans-serif",fontSize:"11px",fontWeight:600,textTransform:"capitalize",transition:"all 0.2s"}}>{f}</button>
))}
<span style={{marginLeft:"auto",color:"#444",fontSize:"12px",alignSelf:"center"}}>{filteredOrders.length} commande{filteredOrders.length>1?"s":""}</span>
</div>
<div style={{display:"flex",flexDirection:"column",gap:"10px"}}>
{filteredOrders.map(order=>{
const sc=STATUS_COLORS[order.status];
return (
<div key={order.id} className="row" onClick={()=>setSelectedOrder(order)} style={{background:"#111118",border:"1px solid #1a1a2e",borderRadius:"8px",padding:"14px",cursor:"pointer",transition:"background 0.2s"}}>
<div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",flexWrap:"wrap",gap:"8px"}}>
<div style={{display:"flex",alignItems:"center",gap:"8px"}}>
<span style={{color:"#D4A843",fontWeight:700,fontSize:"12px"}}>{order.id}</span>
<span style={{background:sc.bg,color:sc.color,border:`1px solid ${sc.border}`,fontSize:"9px",fontWeight:700,padding:"2px 8px",borderRadius:"6px"}}>{order.status.toUpperCase()}</span>
{order.promo&&<span style={{background:"rgba(155,89,182,0.1)",color:"#9b59b6",border:"1px solid #9b59b633",fontSize:"9px",padding:"2px 6px",borderRadius:"6px"}}>🎁 {order.promo}</span>}
</div>
<div style={{textAlign:"right"}}>
<span style={{fontFamily:"'Playfair Display',serif",fontSize:"17px",color:"#D4A843",fontWeight:700}}>{order.total.toFixed(2)} €</span>
<p style={{color:"#333",fontSize:"10px"}}>{order.time} · {order.date}</p>
</div>
</div>
<p style={{color:"#666",fontSize:"12px",marginTop:"8px"}}>👤 {order.client} · 📍 {order.address}</p>
<p style={{color:"#333",fontSize:"11px",marginTop:"4px"}}>{order.items.join(" · ")}</p>
</div>
);
})}
</div>
{selectedOrder&&(
<div style={{position:"fixed",inset:0,zIndex:200,background:"rgba(0,0,0,0.85)",display:"flex",alignItems:"center",justifyContent:"center",padding:"16px"}} onClick={()=>setSelectedOrder(null)}>
<div onClick={e=>e.stopPropagation()} style={{background:"#0d0d1a",border:"1px solid #1a1a2e",borderRadius:"12px",padding:"26px",maxWidth:"440px",width:"100%",animation:"slideIn 0.2s ease"}}>
<div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"18px"}}>
<h3 style={{fontFamily:"'Playfair Display',serif",fontSize:"17px",color:"#D4A843"}}>Commande {selectedOrder.id}</h3>
<button onClick={()=>setSelectedOrder(null)} style={{background:"none",border:"none",color:"#555",fontSize:"20px",cursor:"pointer"}}>×</button>
</div>
{[["Client",selectedOrder.client],["Téléphone",selectedOrder.phone],["Adresse",selectedOrder.address],["Zone",selectedOrder.zone],["Heure",`${selectedOrder.time} — ${selectedOrder.date}`]].map(([k,v])=>(
<div key={k} style={{display:"flex",justifyContent:"space-between",borderBottom:"1px solid #1a1a2e",paddingBottom:"8px",marginBottom:"8px"}}>
<span style={{color:"#444",fontSize:"12px"}}>{k}</span><span style={{color:"#ccc",fontSize:"12px",fontWeight:600}}>{v}</span>
</div>
))}
<p style={{color:"#444",fontSize:"10px",marginBottom:"6px",letterSpacing:"1px"}}>ARTICLES :</p>
{selectedOrder.items.map(item=><p key={item} style={{color:"#666",fontSize:"11px",marginBottom:"3px"}}>• {item}</p>)}
<div style={{display:"flex",justifyContent:"space-between",marginTop:"14px",paddingTop:"10px",borderTop:"1px solid #1a1a2e",marginBottom:"16px"}}>
<span style={{color:"#888"}}>Total</span>
<span style={{fontFamily:"'Playfair Display',serif",fontSize:"18px",color:"#D4A843",fontWeight:700}}>{selectedOrder.total.toFixed(2)} €</span>
</div>
<p style={{color:"#444",fontSize:"10px",letterSpacing:"2px",marginBottom:"8px"}}>CHANGER LE STATUT :</p>
<div style={{display:"flex",gap:"6px",flexWrap:"wrap"}}>
{["en attente","en cours","livré","annulé"].map(s=>{const sc=STATUS_COLORS[s];return(
<button key={s} onClick={()=>updateOrderStatus(selectedOrder.id,s)} className="btn-sm" style={{background:selectedOrder.status===s?sc.color:sc.bg,color:selectedOrder.status===s?"#0a0a0a":sc.color,border:`1px solid ${sc.border}`,padding:"6px 12px",borderRadius:"6px",cursor:"pointer",fontFamily:"'DM Sans',sans-serif",fontSize:"10px",fontWeight:700,textTransform:"capitalize",transition:"all 0.2s"}}>{s}</button>
);})}
</div>
</div>
</div>
)}
</div>
)}

{tab==="products"&&(
<div style={{animation:"slideIn 0.3s ease"}}>
<div style={{display:"flex",gap:"10px",marginBottom:"14px",flexWrap:"wrap"}}>
<input value={searchProduct} onChange={e=>setSearchProduct(e.target.value)} placeholder="🔍 Rechercher..."
style={{flex:1,minWidth:"180px",padding:"10px 14px",background:"#111118",border:"1px solid #1a1a2e",borderRadius:"6px",color:"#fff",fontFamily:"'DM Sans',sans-serif",fontSize:"12px",outline:"none"}}/>
<button onClick={()=>setNewProductModal(true)} style={{background:"#D4A843",color:"#0a0a0a",border:"none",padding:"10px 16px",borderRadius:"6px",cursor:"pointer",fontFamily:"'DM Sans',sans-serif",fontSize:"11px",fontWeight:700,letterSpacing:"1px"}}>+ NOUVEAU PRODUIT</button>
</div>
<div style={{background:"#111118",border:"1px solid #1a1a2e",borderRadius:"10px",overflow:"hidden"}}>
<div style={{display:"grid",gridTemplateColumns:"2fr 1fr 1fr 1fr 70px 70px",gap:"10px",padding:"10px 14px",borderBottom:"1px solid #1a1a2e"}}>
{["Produit","Catégorie","Prix","Stock","Statut","Action"].map(h=><span key={h} style={{color:"#333",fontSize:"9px",letterSpacing:"2px",fontWeight:600}}>{h.toUpperCase()}</span>)}
</div>
{filteredProducts.map(p=>(
<div key={p.id} className="row" style={{display:"grid",gridTemplateColumns:"2fr 1fr 1fr 1fr 70px 70px",gap:"10px",padding:"10px 14px",borderBottom:"1px solid #0d0d0d",alignItems:"center",transition:"background 0.2s"}}>
<div style={{display:"flex",alignItems:"center",gap:"8px"}}><span style={{fontSize:"16px"}}>{p.emoji}</span><span style={{color:p.active?"#ccc":"#333",fontSize:"12px"}}>{p.name}</span></div>
<span style={{color:CAT_COLORS[p.category]||"#666",fontSize:"10px",background:`${CAT_COLORS[p.category]}15`,padding:"2px 8px",borderRadius:"6px",textTransform:"capitalize"}}>{p.category}</span>
<span style={{color:"#D4A843",fontSize:"12px",fontWeight:600}}>{p.price.toFixed(2)} €</span>
<span style={{color:p.stock<=5?"#e74c3c":p.stock<=15?"#e67e22":"#2ecc71",fontSize:"12px",fontWeight:600}}>{p.stock} {p.stock<=5&&"⚠️"}</span>
<button onClick={()=>toggleProduct(p.id)} className="btn-sm" style={{background:p.active?"rgba(46,204,113,0.1)":"rgba(231,76,60,0.1)",color:p.active?"#2ecc71":"#e74c3c",border:`1px solid ${p.active?"#2ecc7133":"#e74c3c33"}`,padding:"4px 8px",borderRadius:"6px",cursor:"pointer",fontFamily:"'DM Sans',sans-serif",fontSize:"9px",fontWeight:700}}>{p.active?"ACTIF":"INACTIF"}</button>
<button onClick={()=>setEditProduct({...p})} className="btn-sm" style={{background:"rgba(212,168,67,0.1)",color:"#D4A843",border:"1px solid #D4A84333",padding:"4px 8px",borderRadius:"6px",cursor:"pointer",fontFamily:"'DM Sans',sans-serif",fontSize:"9px",fontWeight:700}}>ÉDITER</button>
</div>
))}
</div>
{editProduct&&(
<div style={{position:"fixed",inset:0,zIndex:200,background:"rgba(0,0,0,0.85)",display:"flex",alignItems:"center",justifyContent:"center",padding:"16px"}} onClick={()=>setEditProduct(null)}>
<div onClick={e=>e.stopPropagation()} style={{background:"#0d0d1a",border:"1px solid #1a1a2e",borderRadius:"12px",padding:"26px",maxWidth:"360px",width:"100%",animation:"slideIn 0.2s ease"}}>
<h3 style={{fontFamily:"'Playfair Display',serif",fontSize:"17px",color:"#D4A843",marginBottom:"18px"}}>Modifier le produit</h3>
{[{label:"Nom",key:"name",type:"text"},{label:"Prix (€)",key:"price",type:"number"},{label:"Stock",key:"stock",type:"number"},{label:"Emoji",key:"emoji",type:"text"}].map(({label,key,type})=>(
<div key={key} style={{marginBottom:"10px"}}>
<label style={{color:"#444",fontSize:"10px",letterSpacing:"1px",display:"block",marginBottom:"4px"}}>{label.toUpperCase()}</label>
<input type={type} value={editProduct[key]} onChange={e=>setEditProduct(p=>({...p,[key]:e.target.value}))}
style={{width:"100%",padding:"10px",background:"#111118",border:"1px solid #1a1a2e",borderRadius:"4px",color:"#fff",fontFamily:"'DM Sans',sans-serif",fontSize:"12px",outline:"none"}}/>
</div>
))}
<div style={{display:"flex",gap:"8px",marginTop:"16px"}}>
<button onClick={()=>saveProduct({...editProduct,price:parseFloat(editProduct.price),stock:parseInt(editProduct.stock)})} style={{flex:1,background:"#D4A843",color:"#0a0a0a",border:"none",padding:"11px",borderRadius:"6px",cursor:"pointer",fontFamily:"'DM Sans',sans-serif",fontSize:"11px",fontWeight:700}}>SAUVEGARDER</button>
<button onClick={()=>setEditProduct(null)} style={{background:"transparent",border:"1px solid #1a1a2e",color:"#444",padding:"11px 14px",borderRadius:"6px",cursor:"pointer",fontFamily:"'DM Sans',sans-serif",fontSize:"11px"}}>Annuler</button>
</div>
</div>
</div>
)}
{newProductModal&&(
<div style={{position:"fixed",inset:0,zIndex:200,background:"rgba(0,0,0,0.85)",display:"flex",alignItems:"center",justifyContent:"center",padding:"16px"}} onClick={()=>setNewProductModal(false)}>
<div onClick={e=>e.stopPropagation()} style={{background:"#0d0d1a",border:"1px solid #1a1a2e",borderRadius:"12px",padding:"26px",maxWidth:"360px",width:"100%",animation:"slideIn 0.2s ease"}}>
<h3 style={{fontFamily:"'Playfair Display',serif",fontSize:"17px",color:"#D4A843",marginBottom:"18px"}}>Nouveau produit</h3>
{[{label:"Nom",key:"name",type:"text"},{label:"Prix (€)",key:"price",type:"number"},{label:"Stock",key:"stock",type:"number"},{label:"Emoji",key:"emoji",type:"text"}].map(({label,key,type})=>(
<div key={key} style={{marginBottom:"10px"}}>
<label style={{color:"#444",fontSize:"10px",letterSpacing:"1px",display:"block",marginBottom:"4px"}}>{label.toUpperCase()}</label>
<input type={type} value={newProduct[key]} onChange={e=>setNewProduct(p=>({...p,[key]:e.target.value}))}
style={{width:"100%",padding:"10px",background:"#111118",border:"1px solid #1a1a2e",borderRadius:"4px",color:"#fff",fontFamily:"'DM Sans',sans-serif",fontSize:"12px",outline:"none"}}/>
</div>
))}
<div style={{marginBottom:"14px"}}>
<label style={{color:"#444",fontSize:"10px",letterSpacing:"1px",display:"block",marginBottom:"4px"}}>CATÉGORIE</label>
<select value={newProduct.category} onChange={e=>setNewProduct(p=>({...p,category:e.target.value}))}
style={{width:"100%",padding:"10px",background:"#111118",border:"1px solid #1a1a2e",borderRadius:"4px",color:"#fff",fontFamily:"'DM Sans',sans-serif",fontSize:"12px",outline:"none"}}>
{["biere","alcool","champagne","vin","apero","soft","accessoire"].map(c=><option key={c} value={c}>{c}</option>)}
</select>
</div>
<div style={{display:"flex",gap:"8px"}}>
<button onClick={addProduct} style={{flex:1,background:"#D4A843",color:"#0a0a0a",border:"none",padding:"11px",borderRadius:"6px",cursor:"pointer",fontFamily:"'DM Sans',sans-serif",fontSize:"11px",fontWeight:700}}>AJOUTER</button>
<button onClick={()=>setNewProductModal(false)} style={{background:"transparent",border:"1px solid #1a1a2e",color:"#444",padding:"11px 14px",borderRadius:"6px",cursor:"pointer",fontFamily:"'DM Sans',sans-serif",fontSize:"11px"}}>Annuler</button>
</div>
</div>
</div>
)}
</div>
)}

{tab==="promos"&&(
<div style={{animation:"slideIn 0.3s ease"}}>
<div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"14px",flexWrap:"wrap",gap:"10px"}}>
<p style={{color:"#444",fontSize:"12px"}}>{promosProp.length} codes · {promosProp.filter(p=>p.active).length} actifs</p>
<button onClick={()=>{setEditPromo({code:"",type:"percent",discount:10,minOrder:20,maxUses:50,active:true,expires:"31/12/2026",isNew:true});setNewPromo(true);}}
style={{background:"#D4A843",color:"#0a0a0a",border:"none",padding:"9px 16px",borderRadius:"6px",cursor:"pointer",fontFamily:"'DM Sans',sans-serif",fontSize:"11px",fontWeight:700,letterSpacing:"1px"}}>+ NOUVEAU CODE</button>
</div>
<div style={{display:"flex",flexDirection:"column",gap:"10px"}}>
{promosProp.map(promo=>(
<div key={promo.code} style={{background:"#111118",border:`1px solid ${promo.active?"#1a1a2e":"#0d0d0d"}`,borderRadius:"10px",padding:"16px",opacity:promo.active?1:0.5}}>
<div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",flexWrap:"wrap",gap:"10px"}}>
<div style={{display:"flex",alignItems:"center",gap:"12px"}}>
<span style={{background:"rgba(212,168,67,0.12)",border:"1px solid #D4A84444",color:"#D4A843",fontSize:"13px",fontWeight:700,padding:"4px 12px",borderRadius:"6px",letterSpacing:"2px"}}>{promo.code}</span>
<div>
<p style={{color:"#ccc",fontSize:"13px",fontWeight:600}}>{promo.type==="percent"?`−${promo.discount}%`:`−${promo.discount} €`} <span style={{color:"#444",fontSize:"11px",fontWeight:400}}>dès {promo.minOrder} €</span></p>
<p style={{color:"#333",fontSize:"11px"}}>Expire le {promo.expires}</p>
</div>
</div>
<div style={{display:"flex",gap:"10px",alignItems:"center"}}>
<div style={{textAlign:"center"}}>
<p style={{color:"#D4A843",fontSize:"16px",fontWeight:700}}>{promo.uses}</p>
<p style={{color:"#333",fontSize:"9px"}}>/ {promo.maxUses} utilisations</p>
</div>
<div style={{width:"38px",height:"38px",borderRadius:"50%",background:"#0d0d1a",display:"flex",alignItems:"center",justifyContent:"center",position:"relative"}}>
<svg viewBox="0 0 36 36" width="38" height="38" style={{position:"absolute",top:0,left:0,transform:"rotate(-90deg)"}}>
<circle cx="18" cy="18" r="15" fill="none" stroke="#1a1a2e" strokeWidth="3"/>
<circle cx="18" cy="18" r="15" fill="none" stroke="#D4A843" strokeWidth="3" strokeDasharray={`${(promo.uses/promo.maxUses)*94} 94`} strokeLinecap="round"/>
</svg>
<span style={{color:"#D4A843",fontSize:"8px",fontWeight:700,position:"relative",zIndex:1}}>{Math.round((promo.uses/promo.maxUses)*100)}%</span>
</div>
</div>
</div>
<div style={{display:"flex",gap:"8px",marginTop:"12px"}}>
<button onClick={()=>setEditPromo({...promo})} className="btn-sm" style={{background:"rgba(212,168,67,0.08)",color:"#D4A843",border:"1px solid #D4A84333",padding:"5px 12px",borderRadius:"6px",cursor:"pointer",fontFamily:"'DM Sans',sans-serif",fontSize:"10px",fontWeight:700}}>ÉDITER</button>
<button onClick={()=>togglePromo(promo.code)} className="btn-sm" style={{background:promo.active?"rgba(231,76,60,0.08)":"rgba(46,204,113,0.08)",color:promo.active?"#e74c3c":"#2ecc71",border:`1px solid ${promo.active?"#e74c3c33":"#2ecc7133"}`,padding:"5px 12px",borderRadius:"6px",cursor:"pointer",fontFamily:"'DM Sans',sans-serif",fontSize:"10px",fontWeight:700}}>{promo.active?"DÉSACTIVER":"ACTIVER"}</button>
<button onClick={()=>deletePromo(promo.code)} className="btn-sm" style={{background:"rgba(231,76,60,0.05)",color:"#e74c3c44",border:"1px solid #e74c3c22",padding:"5px 12px",borderRadius:"6px",cursor:"pointer",fontFamily:"'DM Sans',sans-serif",fontSize:"10px",fontWeight:700}}>SUPPRIMER</button>
</div>
</div>
))}
</div>
{editPromo&&(
<div style={{position:"fixed",inset:0,zIndex:200,background:"rgba(0,0,0,0.85)",display:"flex",alignItems:"center",justifyContent:"center",padding:"16px"}} onClick={()=>{setEditPromo(null);setNewPromo(false);}}>
<div onClick={e=>e.stopPropagation()} style={{background:"#0d0d1a",border:"1px solid #1a1a2e",borderRadius:"12px",padding:"26px",maxWidth:"360px",width:"100%",animation:"slideIn 0.2s ease"}}>
<h3 style={{fontFamily:"'Playfair Display',serif",fontSize:"17px",color:"#D4A843",marginBottom:"18px"}}>{newPromo?"Nouveau code promo":"Modifier le code"}</h3>
{[{label:"Code promo",key:"code",type:"text"},{label:"Réduction",key:"discount",type:"number"},{label:"Commande minimum (€)",key:"minOrder",type:"number"},{label:"Max utilisations",key:"maxUses",type:"number"},{label:"Expiration (JJ/MM/AAAA)",key:"expires",type:"text"}].map(({label,key,type})=>(
<div key={key} style={{marginBottom:"10px"}}>
<label style={{color:"#444",fontSize:"10px",letterSpacing:"1px",display:"block",marginBottom:"4px"}}>{label.toUpperCase()}</label>
<input type={type} value={editPromo[key]} onChange={e=>setEditPromo(p=>({...p,[key]:e.target.value}))}
style={{width:"100%",padding:"10px",background:"#111118",border:"1px solid #1a1a2e",borderRadius:"4px",color:"#fff",fontFamily:"'DM Sans',sans-serif",fontSize:"12px",outline:"none",textTransform:key==="code"?"uppercase":"none"}}/>
</div>
))}
<div style={{marginBottom:"14px"}}>
<label style={{color:"#444",fontSize:"10px",letterSpacing:"1px",display:"block",marginBottom:"6px"}}>TYPE DE RÉDUCTION</label>
<div style={{display:"flex",gap:"8px"}}>
{[{val:"percent",label:"Pourcentage %"},{val:"fixed",label:"Montant fixe €"}].map(({val,label})=>(
<button key={val} onClick={()=>setEditPromo(p=>({...p,type:val}))} style={{flex:1,padding:"8px",borderRadius:"6px",cursor:"pointer",background:editPromo.type===val?"#D4A843":"transparent",color:editPromo.type===val?"#0a0a0a":"#444",border:`1px solid ${editPromo.type===val?"#D4A843":"#1a1a2e"}`,fontFamily:"'DM Sans',sans-serif",fontSize:"11px",fontWeight:600}}>{label}</button>
))}
</div>
</div>
<div style={{display:"flex",gap:"8px"}}>
<button onClick={()=>savePromo({...editPromo,discount:parseFloat(editPromo.discount),minOrder:parseFloat(editPromo.minOrder),maxUses:parseInt(editPromo.maxUses)})}
style={{flex:1,background:"#D4A843",color:"#0a0a0a",border:"none",padding:"11px",borderRadius:"6px",cursor:"pointer",fontFamily:"'DM Sans',sans-serif",fontSize:"11px",fontWeight:700}}>
{newPromo?"CRÉER":"SAUVEGARDER"}
</button>
<button onClick={()=>{setEditPromo(null);setNewPromo(false);}} style={{background:"transparent",border:"1px solid #1a1a2e",color:"#444",padding:"11px 14px",borderRadius:"6px",cursor:"pointer",fontFamily:"'DM Sans',sans-serif",fontSize:"11px"}}>Annuler</button>
</div>
</div>
</div>
)}
</div>
)}
</div>
</div>
);
}

// ════════════════════════════════════════════════════════════
// ROOT — Routeur principal
// ════════════════════════════════════════════════════════════
export default function Root() {
// État partagé entre boutique et admin
const [ageConfirmed, setAgeConfirmed] = useState(false);
const [products, setProducts] = useState(ALL_PRODUCTS);
const [promos, setPromos] = useState(INIT_PROMOS);
const [orders, setOrders] = useState(INIT_ORDERS);

// Détection du mode admin : ?admin dans l'URL
const isAdmin = typeof window !== "undefined" && window.location.search.includes("admin");

const handleNewOrder = (order) => {
setOrders(prev => [order, ...prev]);
};

return (
<>
<style>{GLOBAL_CSS}</style>
{isAdmin ? (
<Admin
products={products}
setProducts={setProducts}
promos={promos}
setPromos={setPromos}
orders={orders}
setOrders={setOrders}
/>
) : !ageConfirmed ? (
<AgeGate onConfirm={() => setAgeConfirmed(true)} />
) : (
<Shop
products={products}
promos={promos}
orders={orders}
onNewOrder={handleNewOrder}
/>
)}
</>
);
}{ id: 51, name: "Serviettes Cocktail x50", category: "accessoire", type: "Serviettes", deg: "", price: 3.50, desc: "Serviettes en papier noir élégant", emoji: "🖤", stock: 45, active: true },
{ id: 52, name: "Seau à Glaçons", category: "accessoire", type: "Seau", deg: "", price: 7.90, desc: "Seau chromé avec pince", emoji: "🪣", stock: 20, active: true },
{ id: 53, name: "Décapsuleur Porte-clé", category: "accessoire", type: "Décapsuleur", deg: "", price: 2.50, desc: "Solide et compact", emoji: "🔑", stock: 35, active: true },
];

const INIT_PROMOS = [
{ code: "NUIT10", type: "percent", discount: 10, minOrder: 20, uses: 14, maxUses: 50, active: true, expires: "31/12/2026" },
{ code: "BIENVENUE", type: "fixed", discount: 5, minOrder: 15, uses: 28, maxUses: 100, active: true, expires: "31/12/2026" },
{ code: "SOIREE15", type: "percent", discount: 15, minOrder: 40, uses: 7, maxUses: 30, active: true, expires: "30/06/2026" },
{ code: "KEISEN", type: "fixed", discount: 8, minOrder: 30, uses: 11, maxUses: 40, active: false, expires: "30/06/2026" },
];

const INIT_ORDERS = [
{ id: "KN-001", client: "Mehdi B.", phone: "06 12 34 56 78", address: "12 rue des Lilas, Évry (91)", items: ["IPA Sauvage x2", "Cacahouètes Grillées", "Glaçons 2kg"], total: 16.40, zone: "Zone 1", status: "livré", time: "23:14", date: "29/05/2026", promo: null },
{ id: "KN-002", client: "Sarah D.", phone: "07 98 76 54 32", address: "5 av. Victor Hugo, Créteil (94)", items: ["Champagne Rosé Prestige", "Flûtes Plastique x20", "Popcorn Caramel"],total: 63.70, zone: "Zone 2", status: "en cours", time: "23:47", date: "29/05/2026", promo: "BIENVENUE" },
{ id: "KN-003", client: "Jordan K.", phone: "06 55 44 33 22", address: "8 bis rue du Moulin, Massy (91)", items: ["Pack Apéro Entre Amis", "Coca-Cola x6", "Schweppes Tonic x6"], total: 43.90, zone: "Zone 1", status: "en attente", time: "00:03", date: "30/05/2026", promo: null },
{ id: "KN-004", client: "Lucie M.", phone: "06 22 11 00 99", address: "3 impasse des Roses, Melun (77)", items: ["Whisky Single Malt 12 ans", "Saucisson Sec", "Pain Sec aux Herbes"], total: 65.70, zone: "Zone 3", status: "en cours", time: "00:21", date: "30/05/2026", promo: "KEISEN" },
{ id: "KN-005", client: "Thomas R.", phone: "07 33 44 55 66", address: "27 bd Gambetta, Vincennes (94)", items: ["Pack Grosse Soirée", "Red Bull x4"], total: 63.80, zone: "Zone 2", status: "annulé", time: "01:05", date: "30/05/2026", promo: null },
{ id: "KN-006", client: "Aïcha N.", phone: "06 77 88 99 00", address: "14 rue de la Paix, Corbeil (91)", items: ["Prosecco Extra Dry", "Verres Plastique x50", "Chips Paprika Fumé x2"],total: 29.90, zone: "Zone 1", status: "livré", time: "01:38", date: "30/05/2026", promo: "NUIT10" },
];

const ZONES = {
1: { label: "Zone 1 — Proche", time: "< 15 min", minOrder: 20, deliveryFee: 4.90, freeFrom: 30, color: "#2ecc71", dept: ["91"], cities: ["Évry","Corbeil-Essonnes","Massy","Palaiseau","Saclay","Gif-sur-Yvette","Orsay","Les Ulis","Longjumeau","Savigny-sur-Orge","Viry-Châtillon","Juvisy-sur-Orge"] },
2: { label: "Zone 2 — Moyenne", time: "15–25 min", minOrder: 35, deliveryFee: 4.90, freeFrom: 30, color: "#D4A843", dept: ["94"], cities: ["Créteil","Vincennes","Saint-Maur-des-Fossés","Vitry-sur-Seine","Ivry-sur-Seine","Charenton-le-Pont","Maisons-Alfort","Alfortville","Champigny-sur-Marne","Nogent-sur-Marne"] },
3: { label: "Zone 3 — Lointaine",time: "> 25 min", minOrder: 55, deliveryFee: 4.90, freeFrom: 30, color: "#e74c3c", dept: ["77"], cities: ["Melun","Meaux","Chelles","Torcy","Marne-la-Vallée","Lagny-sur-Marne","Pontault-Combault","Combs-la-Ville","Savigny-le-Temple","Noisiel"] },
};

const PACKS = [
{ id: 101, name: "Pack Soirée Détente", price: 18.90, originalPrice: 22.40, emoji: "🌙", badge: "BEST-SELLER", badgeColor: "#D4A843", desc: "L'essentiel pour une soirée tranquille à deux.", items: ["🍺 Blonde Dorée x2", "🥜 Cacahouètes Grillées", "🍿 Popcorn Beurre & Sel"] },
{ id: 102, name: "Pack Apéro Entre Amis", price: 28.50, originalPrice: 34.70, emoji: "🎉", badge: "POPULAIRE", badgeColor: "#8B5CF6", desc: "Parfait pour 4-6 personnes.", items: ["🍺 IPA Sauvage x2", "🍺 Blonde Dorée x2", "🥩 Saucisson Sec", "🫒 Tartinade Tapenade", "🍞 Pain Sec aux Herbes", "🥜 Cacahouètes Épicées"] },
{ id: 103, name: "Pack Grosse Soirée", price: 54.90, originalPrice: 67.20, emoji: "🔥", badge: "-18%", badgeColor: "#e74c3c", desc: "Pour les grandes occasions — 8 personnes et plus.", items: ["🍺 IPA Sauvage x3", "🍺 Triple Abbaye x2", "🥃 Whisky Single Malt", "🥩 Saucisson au Poivre", "🫒 Tartinade Rillettes", "🍞 Pain Sec x2", "🍿 Popcorn Caramel", "🫙 Biscuits Apéro"] },
{ id: 104, name: "Pack Spiritueux Premium", price: 42.00, originalPrice: 51.00, emoji: "🥃", badge: "PREMIUM", badgeColor: "#D4A843", desc: "Pour les amateurs de beaux alcools.", items: ["🥃 Rhum Agricole AOC", "🍸 Gin Botanique No.7", "🥔 Chips Paprika Fumé", "🫙 Biscuits Fromage", "🥜 Cacahouètes Grillées"] },
];

const REVIEWS = [
{ id: 1, name: "Mehdi B.", stars: 5, date: "12 mai 2025", text: "Livraison ultra rapide, il était 23h30 et j'avais tout reçu en 35 min. Le saucisson et les bières étaient au top !", avatar: "🧑🏽" },
{ id: 2, name: "Lucie M.", stars: 5, date: "3 avril 2025", text: "Parfait pour une soirée impro entre amis. Le pack Apéro entre amis vaut vraiment le coup. Je recommande !", avatar: "👩🏻" },
{ id: 3, name: "Jordan K.", stars: 4, date: "28 mars 2025", text: "Top concept, ça manquait dans le 91. Juste la livraison un peu en retard mais le livreur très sympa.", avatar: "🧑🏿" },
{ id: 4, name: "Sarah D.", stars: 5, date: "14 février 2025", text: "Champagne rosé + flûtes plastiques livrés pour mon anniversaire à minuit. Magique ! Merci Le Keïsen Night 🌙", avatar: "👩🏽" },
{ id: 5, name: "Thomas R.", stars: 5, date: "8 janvier 2025", text: "Le whisky single malt est excellent et le prix est honnête. Site facile à utiliser, je reviendrai.", avatar: "🧑🏼" },
{ id: 6, name: "Aïcha N.", stars: 4, date: "31 décembre 2024", text: "Commandé pour le réveillon, livraison pile à l'heure. Les glaçons et le prosecco étaient parfaits !", avatar: "👩🏾" },
];

const SHOP_NAME = "Le Keïsen Night";

// ─── UTILS ──────────────────────────────────────────────────
function useClock() {
const [now, setNow] = useState(new Date());
useEffect(() => { const t = setInterval(() => setNow(new Date()), 1000); return () => clearInterval(t); }, []);
return now;
}
const isOpen = (now) => { const h = now.getHours(); return h >= 22 || h < 6; };
const getCountdown = (now) => {
const h = now.getHours(), m = now.getMinutes(), s = now.getSeconds();
if (h >= 6 && h < 22) {
let dh = 22-h-1, dm = 59-m, ds = 59-s;
if(ds<0){ds+=60;dm--;} if(dm<0){dm+=60;dh--;}
return {h:Math.max(0,dh), m:Math.max(0,dm), s:Math.max(0,ds)};
}
return null;
};
const pad = n => String(n).padStart(2,"0");

const MoonLogo = ({size=36}) => (
<svg width={size} height={size} viewBox="0 0 36 36" fill="none">
<defs><radialGradient id="mg" cx="40%" cy="35%" r="60%"><stop offset="0%" stopColor="#FFE08A"/><stop offset="100%" stopColor="#D4A843"/></radialGradient></defs>
<path d="M18 4C10.268 4 4 10.268 4 18C4 25.732 10.268 32 18 32C21.5 32 24.7 30.7 27.2 28.5C25.5 28.8 23.8 29 22 29C13.716 29 7 22.284 7 14C7 10.2 8.4 6.7 10.8 4C13.1 4 18 4 18 4Z" fill="url(#mg)"/>
<circle cx="14" cy="13" r="1.5" fill="#C49020" opacity="0.5"/>
<circle cx="20" cy="20" r="1" fill="#C49020" opacity="0.4"/>
<circle cx="11" cy="20" r="0.8" fill="#C49020" opacity="0.3"/>
</svg>
);

const Stars = () => (
<div style={{position:"absolute",inset:0,overflow:"hidden",pointerEvents:"none"}}>
{[...Array(28)].map((_,i)=>(
<div key={i} style={{position:"absolute",width:i%5===0?"2px":"1px",height:i%5===0?"2px":"1px",background:"#fff",borderRadius:"50%",left:`${(i*37+11)%100}%`,top:`${(i*23+7)%100}%`,opacity:0.15+(i%4)*0.1,animation:`twinkle ${2+(i%3)}s ${(i*0.3)%2}s infinite alternate`}}/>
))}
</div>
);

// ─── CSS GLOBAL ─────────────────────────────────────────────
const GLOBAL_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400&family=DM+Sans:wght@300;400;500;600;700&display=swap');
*{box-sizing:border-box;margin:0;padding:0}
::-webkit-scrollbar{width:4px}::-webkit-scrollbar-track{background:#111}::-webkit-scrollbar-thumb{background:#8B6914}
.card{transition:transform 0.3s,box-shadow 0.3s}.card:hover{transform:translateY(-4px);box-shadow:0 20px 40px rgba(0,0,0,0.7)!important}
.row:hover{background:rgba(255,255,255,0.02)!important}
.tab-btn:hover{color:#D4A843!important}
.btn-sm:hover{opacity:0.8}
input:focus,select:focus,textarea:focus{border-color:#D4A843!important}
@keyframes slideIn{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
@keyframes fadeUp{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}
@keyframes pulse{0%,100%{opacity:1}50%{opacity:0.4}}
@keyframes twinkle{from{opacity:0.1}to{opacity:0.6}}
@keyframes moonFloat{0%,100%{transform:translateY(0) rotate(-5deg)}50%{transform:translateY(-4px) rotate(5deg)}}
@keyframes waFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-5px)}}
@keyframes shake{0%,100%{transform:translateX(0)}25%{transform:translateX(-8px)}75%{transform:translateX(8px)}}
@keyframes notif{0%{opacity:0;transform:translateY(20px)}10%,90%{opacity:1;transform:translateY(0)}100%{opacity:0;transform:translateY(-10px)}}
.fade-up{animation:fadeUp 0.45s ease forwards}
`;

const STATUS_COLORS = {
"livré": {bg:"rgba(46,204,113,0.12)", color:"#2ecc71", border:"#2ecc7133"},
"en cours": {bg:"rgba(212,168,67,0.12)", color:"#D4A843", border:"#D4A84333"},
"en attente": {bg:"rgba(52,152,219,0.12)", color:"#3498db", border:"#3498db33"},
"annulé": {bg:"rgba(231,76,60,0.12)", color:"#e74c3c", border:"#e74c3c33"},
};
const CAT_COLORS = {biere:"#D4A843",alcool:"#e74c3c",champagne:"#FFE08A",apero:"#2ecc71",soft:"#3498db",accessoire:"#95a5a6",vin:"#9b59b6"};

// ════════════════════════════════════════════════════════════
// BOUTIQUE
// ════════════════════════════════════════════════════════════

const ZoneSelector = ({onSelect}) => {
const [search, setSearch] = useState("");
const matchingZone = search.length >= 2 ? Object.entries(ZONES).find(([,z]) =>
z.dept.some(d=>search.startsWith(d)) || z.cities.some(c=>c.toLowerCase().includes(search.toLowerCase()))
) : null;
return (
<div style={{position:"fixed",inset:0,zIndex:400,background:"rgba(0,0,0,0.92)",display:"flex",alignItems:"center",justifyContent:"center",padding:"16px"}}>
<div style={{background:"#0d0d1a",border:"1px solid #1a1a2e",borderRadius:"12px",padding:"32px",maxWidth:"500px",width:"100%",maxHeight:"90vh",overflowY:"auto"}}>
<div style={{textAlign:"center",marginBottom:"24px"}}>
<MoonLogo size={40}/>
<h2 style={{fontFamily:"'Playfair Display',serif",fontSize:"20px",color:"#D4A843",marginTop:"10px",marginBottom:"4px"}}>Votre zone de livraison</h2>
<p style={{color:"#555",fontSize:"12px"}}>Entrez votre ville ou code postal</p>
</div>
<input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Ex : Évry, Créteil, 91000..."
style={{width:"100%",padding:"13px",background:"#111118",border:"1px solid #2a2a3e",borderRadius:"6px",color:"#fff",fontFamily:"'DM Sans',sans-serif",fontSize:"14px",outline:"none",marginBottom:"14px"}}/>
{search.length>=2 && (
<div style={{marginBottom:"18px"}}>
{matchingZone ? (
<div style={{background:`${matchingZone[1].color}10`,border:`1px solid ${matchingZone[1].color}55`,borderRadius:"8px",padding:"14px"}}>
<p style={{color:matchingZone[1].color,fontWeight:700,fontSize:"13px",marginBottom:"4px"}}>✅ {matchingZone[1].label} ({matchingZone[1].time})</p>
<p style={{color:"#aaa",fontSize:"12px"}}>Min. <strong style={{color:"#fff"}}>{matchingZone[1].minOrder} €</strong> · Gratuite dès <strong style={{color:"#2ecc71"}}>30 €</strong></p>
<button onClick={()=>onSelect(parseInt(matchingZone[0]))} style={{marginTop:"10px",background:"#D4A843",color:"#0a0a0a",border:"none",padding:"9px 22px",borderRadius:"4px",cursor:"pointer",fontFamily:"'DM Sans',sans-serif",fontSize:"12px",fontWeight:700}}>CHOISIR →</button>
</div>
):(
<div style={{background:"rgba(231,76,60,0.08)",border:"1px solid #e74c3c44",borderRadius:"8px",padding:"12px"}}>
<p style={{color:"#e74c3c",fontSize:"12px",fontWeight:600}}>❌ Zone non couverte — nous livrons dans le 91, 94 et 77.</p>
</div>
)}
</div>
)}
<p style={{color:"#333",fontSize:"9px",letterSpacing:"3px",marginBottom:"12px"}}>TOUTES LES ZONES</p>
<div style={{display:"flex",flexDirection:"column",gap:"8px"}}>
{Object.entries(ZONES).map(([zid,z])=>(
<div key={zid} onClick={()=>onSelect(parseInt(zid))} style={{background:"#111118",border:"1px solid #1a1a2e",borderRadius:"8px",padding:"13px",cursor:"pointer",transition:"border-color 0.2s"}}
onMouseOver={e=>e.currentTarget.style.borderColor=z.color} onMouseOut={e=>e.currentTarget.style.borderColor="#1a1a2e"}>
<div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"4px"}}>
<span style={{color:z.color,fontWeight:700,fontSize:"13px"}}>{z.label}</span>
<span style={{fontSize:"10px",color:z.color,background:`${z.color}18`,padding:"2px 8px",borderRadius:"8px"}}>{z.time}</span>
</div>
<div style={{display:"flex",gap:"14px",flexWrap:"wrap"}}>
<span style={{color:"#555",fontSize:"11px"}}>Dép. <strong style={{color:"#aaa"}}>{z.dept.join(", ")}</strong></span>
<span style={{color:"#555",fontSize:"11px"}}>Min. <strong style={{color:"#D4A843"}}>{z.minOrder} €</strong></span>
<span style={{color:"#555",fontSize:"11px"}}>Gratuite dès <strong style={{color:"#2ecc71"}}>30 €</strong></span>
</div>
<p style={{color:"#2a2a3a",fontSize:"10px",marginTop:"4px"}}>{z.cities.slice(0,5).join(", ")}…</p>
</div>
))}
</div>
</div>
</div>
);
};

const AgeGate = ({onConfirm}) => {
const [day,setDay]=useState(""); const [month,setMonth]=useState(""); const [year,setYear]=useState(""); const [error,setError]=useState("");
const verify=()=>{
const d=parseInt(day),m=parseInt(month),y=parseInt(year);
if(!d||!m||!y||y<1900||y>2025){setError("Date invalide.");return;}
const birth=new Date(y,m-1,d),now=new Date();
let age=now.getFullYear()-birth.getFullYear();
if(now<new Date(now.getFullYear(),birth.getMonth(),birth.getDate()))age--;
age>=18?onConfirm():setError("❌ Vous devez avoir 18 ans ou plus.");
};
return (
<div style={{minHeight:"100vh",background:"radial-gradient(ellipse at top,#0d1a2e 0%,#0a0a0a 70%)",display:"flex",alignItems:"center",justifyContent:"center",position:"relative"}}>
<Stars/>
<div style={{background:"linear-gradient(135deg,rgba(13,26,46,0.97),rgba(10,10,18,0.98))",border:"1px solid #8B6914",borderRadius:"10px",padding:"50px 44px",maxWidth:"420px",width:"90%",textAlign:"center",boxShadow:"0 40px 80px rgba(0,0,0,0.9)",position:"relative",zIndex:1}}>
<div style={{marginBottom:"14px",animation:"moonFloat 4s ease-in-out infinite"}}><MoonLogo size={58}/></div>
<h1 style={{color:"#D4A843",fontSize:"22px",fontWeight:900,letterSpacing:"2px",marginBottom:"4px",fontFamily:"'Playfair Display',serif"}}>{SHOP_NAME}</h1>
<p style={{color:"#444",fontSize:"9px",letterSpacing:"5px",marginBottom:"22px",fontFamily:"'DM Sans',sans-serif"}}>LIVRAISON DE NUIT · 22H–6H</p>
<p style={{color:"#bbb",fontSize:"13px",marginBottom:"20px",fontFamily:"'DM Sans',sans-serif",lineHeight:1.7}}>Ce site vend de l'alcool. Vous devez avoir <strong style={{color:"#D4A843"}}>18 ans ou plus</strong> pour y accéder.</p>
<div style={{display:"flex",gap:"8px",justifyContent:"center",marginBottom:"18px"}}>
{[{val:day,set:setDay,ph:"JJ",w:"64px"},{val:month,set:setMonth,ph:"MM",w:"64px"},{val:year,set:setYear,ph:"AAAA",w:"84px"}].map(({val,set,ph,w})=>(
<input key={ph} value={val} onChange={e=>set(e.target.value.replace(/\D/g,""))} placeholder={ph} maxLength={ph==="AAAA"?4:2}
style={{width:w,padding:"11px 6px",textAlign:"center",background:"#111",border:"1px solid #2a2a3e",borderRadius:"4px",color:"#fff",fontSize:"16px",fontFamily:"'DM Sans',sans-serif",outline:"none"}}/>
))}
</div>
{error&&<p style={{color:"#e74c3c",fontSize:"12px",marginBottom:"12px"}}>{error}</p>}
<button onClick={verify} onMouseOver={e=>e.target.style.background="#e8bc58"} onMouseOut={e=>e.target.style.background="#D4A843"}
style={{background:"#D4A843",color:"#0a0a0a",border:"none",padding:"13px",fontSize:"12px",fontWeight:700,letterSpacing:"2px",cursor:"pointer",borderRadius:"4px",fontFamily:"'DM Sans',sans-serif",width:"100%",transition:"background 0.2s"}}>
CONFIRMER MON ÂGE
</button>
<p style={{color:"#2a2a3a",fontSize:"10px",marginTop:"18px",fontFamily:"'DM Sans',sans-serif",lineHeight:1.8}}>L'abus d'alcool est dangereux pour la santé.<br/>Vente interdite aux mineurs de moins de 18 ans.</p>
</div>
</div>
);
};

function Shop({products: productsProp, promos: promosProp, orders: ordersProp, onNewOrder}) {
const [zoneId,setZoneId]=useState(null);
const [cart,setCart]=useState([]);
const [filter,setFilter]=useState("tous");
const [cartOpen,setCartOpen]=useState(false);
const [checkoutStep,setCheckoutStep]=useState(null);
const [added,setAdded]=useState(null);
const [showZone,setShowZone]=useState(false);
const [page,setPage]=useState("shop");
const [promoCode,setPromoCode]=useState("");
const [appliedPromo,setAppliedPromo]=useState(null);
const [promoError,setPromoError]=useState("");
const [promoSuccess,setPromoSuccess]=useState("");
const [form,setForm]=useState({prenom:"",nom:"",email:"",tel:"",adresse:"",ville:"",cp:""});
const now=useClock();
const open=isOpen(now);
const countdown=getCountdown(now);
const zone=zoneId?ZONES[zoneId]:null;
const activeProducts = productsProp.filter(p=>p.active);
const filtered=filter==="packs"?[]:filter==="tous"?activeProducts:activeProducts.filter(p=>p.category===filter);
const showPacks=filter==="packs"||filter==="tous";

const promoMap = {};
promosProp.filter(p=>p.active).forEach(p=>{ promoMap[p.code]=p; });

const addToCart=(p,isPack=false)=>{
setCart(prev=>{const ex=prev.find(i=>i.id===p.id);return ex?prev.map(i=>i.id===p.id?{...i,qty:i.qty+1}:i):[...prev,{...p,qty:1,isPack}];});
setAdded(p.id);setTimeout(()=>setAdded(null),1200);
};
const removeFromCart=id=>setCart(prev=>prev.filter(i=>i.id!==id));
const updateQty=(id,d)=>setCart(prev=>prev.map(i=>i.id===id?{...i,qty:Math.max(1,i.qty+d)}:i));
const subtotal=cart.reduce((s,i)=>s+i.price*i.qty,0);
const promoDiscount=appliedPromo?(appliedPromo.type==="percent"?subtotal*(appliedPromo.discount/100):Math.min(appliedPromo.discount,subtotal)):0;
const discountedSubtotal=subtotal-promoDiscount;
const deliveryFee=zone?(discountedSubtotal>=30?0:4.90):4.90;
const total=discountedSubtotal+deliveryFee;
const cartCount=cart.reduce((s,i)=>s+i.qty,0);
const minOrder=zone?zone.minOrder:15;
const canOrder=subtotal>=minOrder;

const applyPromo=()=>{
const code=promoCode.trim().toUpperCase();
if(!code){setPromoError("Entrez un code promo.");return;}
const found=promoMap[code];
if(!found){setPromoError("Code invalide ❌");setPromoSuccess("");return;}
if(subtotal<found.minOrder){setPromoError(`Minimum ${found.minOrder} € requis.`);setPromoSuccess("");return;}
setAppliedPromo({...found,code});setPromoSuccess(`✅ Code "${code}" appliqué !`);setPromoError("");
};
const removePromo=()=>{setAppliedPromo(null);setPromoCode("");setPromoSuccess("");setPromoError("");};

const getBadge=(p)=>{
if(p.deg) return {text:p.deg,bg:"#D4A843",color:"#0a0a0a",border:null};
if(p.category==="soft") return {text:"SOFT",bg:"rgba(52,152,219,0.12)",color:"#3498db",border:"#3498db55"};
if(p.category==="accessoire") return {text:"ACCÈS.",bg:"rgba(149,165,166,0.12)",color:"#95a5a6",border:"#95a5a655"};
if(p.category==="vin") return {text:"VIN",bg:"rgba(155,89,182,0.12)",color:"#9b59b6",border:"#9b59b655"};
if(p.category==="champagne") return {text:"🥂",bg:"rgba(212,168,67,0.12)",color:"#D4A843",border:"#D4A84355"};
return {text:"APÉRO",bg:"rgba(46,204,113,0.1)",color:"#2ecc71",border:"#2ecc7155"};
};

const confirmOrder=()=>{
const newOrder={
id:`KN-${String(Date.now()).slice(-4)}`,
client:`${form.prenom} ${form.nom}`,
phone:form.tel,
address:`${form.adresse}, ${form.ville} (${zone?.dept[0]||"?"})`,
items:cart.map(i=>`${i.name} x${i.qty}`),
total,zone:zone?.label||"?",
status:"en attente",
time:new Date().toLocaleTimeString('fr-FR',{hour:'2-digit',minute:'2-digit'}),
date:new Date().toLocaleDateString('fr-FR'),
promo:appliedPromo?.code||null,
};
onNewOrder(newOrder);
setCheckoutStep("success");
setCart([]);
setAppliedPromo(null);
};

if(page==="contact") return <ContactPageShop onClose={()=>setPage("shop")} />;
if(page==="cgv") return <CGVPageShop onClose={()=>setPage("shop")} />;
if(page==="tracking") return <TrackingPage orders={ordersProp} onClose={()=>setPage("shop")} />;

return (
<div style={{minHeight:"100vh",background:"#0a0a12",fontFamily:"'DM Sans',sans-serif",color:"#fff"}}>
{showZone&&<ZoneSelector onSelect={z=>{setZoneId(z);setShowZone(false);}}/>}

{/* Banner */}
<div style={{background:open?"linear-gradient(90deg,#0d1f0d,#0a1a0a)":"linear-gradient(90deg,#1f1205,#120a03)",borderBottom:`1px solid ${open?"#2ecc7133":"#D4A84333"}`,padding:"8px 20px",display:"flex",alignItems:"center",justifyContent:"center",gap:"10px",flexWrap:"wrap"}}>
<div style={{display:"flex",alignItems:"center",gap:"6px"}}>
<div style={{width:"6px",height:"6px",borderRadius:"50%",background:open?"#2ecc71":"#e67e22",animation:open?"pulse 2s infinite":"none"}}/>
<span style={{fontSize:"11px",fontWeight:700,color:open?"#2ecc71":"#e67e22",letterSpacing:"1px"}}>{open?"🌙 LIVRAISON OUVERTE":"😴 FERMÉ"}</span>
</div>
<span style={{color:"#2a2a3a"}}>·</span>
{open?<span style={{fontSize:"11px",color:"#666"}}>Livraison <strong style={{color:"#D4A843"}}>22h–6h</strong> · 91 · 94 · 77</span>
:countdown?<span style={{fontSize:"11px",color:"#666"}}>Ouverture dans <strong style={{color:"#D4A843"}}>{pad(countdown.h)}h{pad(countdown.m)}m{pad(countdown.s)}s</strong></span>:null}
<span style={{color:"#2a2a3a"}}>·</span>
<span style={{fontSize:"11px",color:"#666"}}>🚚 Gratuite dès <strong style={{color:"#2ecc71"}}>30 €</strong></span>
</div>

{/* Header */}
<header style={{position:"sticky",top:0,zIndex:100,background:"rgba(10,10,18,0.97)",backdropFilter:"blur(16px)",borderBottom:"1px solid #1a1a2e",padding:"0 20px",display:"flex",alignItems:"center",justifyContent:"space-between",height:"64px"}}>
<div style={{display:"flex",alignItems:"center",gap:"10px"}}>
<div style={{animation:"moonFloat 5s ease-in-out infinite"}}><MoonLogo size={34}/></div>
<div>
<div style={{fontFamily:"'Playfair Display',serif",fontSize:"17px",fontWeight:900,color:"#D4A843",letterSpacing:"1px"}}>{SHOP_NAME}</div>
<div style={{fontSize:"8px",color:"#333",letterSpacing:"3px"}}>BIÈRES · SPIRITUEUX · APÉRO</div>
</div>
</div>
<div style={{display:"flex",alignItems:"center",gap:"8px"}}>
<button onClick={()=>setPage("contact")} style={{background:"transparent",border:"1px solid #1a1a2e",color:"#666",padding:"7px 14px",borderRadius:"4px",cursor:"pointer",fontFamily:"'DM Sans',sans-serif",fontSize:"11px",fontWeight:600}} onMouseOver={e=>e.target.style.borderColor="#D4A843"} onMouseOut={e=>e.target.style.borderColor="#1a1a2e"}>CONTACT</button>
<button onClick={()=>setPage("tracking")} style={{background:"transparent",border:"1px solid #1a1a2e",color:"#666",padding:"7px 14px",borderRadius:"4px",cursor:"pointer",fontFamily:"'DM Sans',sans-serif",fontSize:"11px",fontWeight:600}} onMouseOver={e=>e.target.style.borderColor="#D4A843"} onMouseOut={e=>e.target.style.borderColor="#1a1a2e"}>📦 SUIVI</button>
<button onClick={()=>setShowZone(true)} style={{background:zone?`${zone.color}15`:"rgba(212,168,67,0.06)",border:`1px solid ${zone?zone.color+"55":"#D4A84333"}`,borderRadius:"16px",padding:"5px 12px",cursor:"pointer",color:zone?zone.color:"#D4A843",fontSize:"10px",fontWeight:600,fontFamily:"'DM Sans',sans-serif"}}>
{zone?`📍 ${zone.dept[0]}`:"📍 Zone"}
</button>
<button onClick={()=>setCartOpen(true)} style={{background:cartCount>0?"#D4A843":"transparent",color:cartCount>0?"#0a0a0a":"#D4A843",border:"1px solid #D4A843",padding:"7px 14px",borderRadius:"4px",cursor:"pointer",fontFamily:"'DM Sans',sans-serif",fontSize:"11px",fontWeight:700,letterSpacing:"1px",transition:"all 0.2s"}}>
🛒 {cartCount>0?`(${cartCount})`:"PANIER"}
</button>
</div>
</header>

{/* Promo banner */}
<div style={{background:"linear-gradient(90deg,#1a0d2e,#0d0a1a)",borderBottom:"1px solid #2a1a3e",padding:"10px 24px",display:"flex",alignItems:"center",justifyContent:"center",gap:"12px",flexWrap:"wrap"}}>
<span style={{fontSize:"13px"}}>🎁</span>
<span style={{color:"#D4A843",fontSize:"12px",fontWeight:700,letterSpacing:"1px"}}>CODE BIENVENUE</span>
<span style={{color:"#666",fontSize:"12px"}}>—</span>
<span style={{color:"#bbb",fontSize:"12px"}}>5 € offerts sur ta 1ère commande avec le code</span>
<span style={{background:"rgba(212,168,67,0.15)",border:"1px solid #D4A84355",color:"#D4A843",fontSize:"12px",fontWeight:700,padding:"3px 12px",borderRadius:"6px",letterSpacing:"2px"}}>BIENVENUE</span>
</div>

{/* Hero */}
<div style={{position:"relative",background:"radial-gradient(ellipse at top center,#0d1a2e 0%,#0a0a12 60%)",padding:"60px 24px 48px",textAlign:"center",borderBottom:"1px solid #1a1a2e",overflow:"hidden"}}>
<Stars/>
<div style={{position:"relative",zIndex:1}}>
<div style={{display:"inline-flex",alignItems:"center",gap:"8px",background:"rgba(212,168,67,0.07)",border:"1px solid rgba(212,168,67,0.2)",borderRadius:"20px",padding:"5px 14px",marginBottom:"18px"}}>
<span style={{fontSize:"10px",color:"#D4A843",letterSpacing:"2px",fontWeight:600}}>🌙 LIVRAISON DE NUIT · 22H – 6H · 91 · 94 · 77</span>
</div>
<h2 style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(28px,5vw,56px)",fontWeight:900,lineHeight:1.1,color:"#fff",marginBottom:"14px"}}>
Tout pour votre soirée,<br/><em style={{color:"#D4A843"}}>livré cette nuit</em>
</h2>
<p style={{color:"#555",maxWidth:"440px",margin:"0 auto 24px",fontSize:"14px",lineHeight:1.8}}>
Commandez maintenant. Livraison <strong style={{color:"#bbb"}}>dès 22h jusqu'à 6h</strong> en Île-de-France.
</p>
<button onClick={()=>setShowZone(true)} style={{background:"#D4A843",color:"#0a0a0a",border:"none",padding:"12px 26px",borderRadius:"6px",cursor:"pointer",fontFamily:"'DM Sans',sans-serif",fontSize:"12px",fontWeight:700,letterSpacing:"2px"}}>
📍 VÉRIFIER MA ZONE
</button>
</div>
</div>

{zone&&(
<div style={{background:`${zone.color}08`,borderBottom:`1px solid ${zone.color}22`,padding:"10px 24px",display:"flex",alignItems:"center",justifyContent:"center",gap:"16px",flexWrap:"wrap"}}>
<span style={{color:zone.color,fontWeight:700,fontSize:"12px"}}>📍 {zone.label} · Dép. {zone.dept.join(", ")}</span>
<span style={{color:"#333"}}>|</span>
<span style={{color:"#666",fontSize:"11px"}}>Min. <strong style={{color:"#D4A843"}}>{zone.minOrder} €</strong> · Gratuite dès <strong style={{color:"#2ecc71"}}>30 €</strong></span>
<button onClick={()=>setShowZone(true)} style={{background:"transparent",border:"1px solid #222",color:"#555",padding:"3px 10px",borderRadius:"8px",cursor:"pointer",fontFamily:"'DM Sans',sans-serif",fontSize:"10px"}}>Changer</button>
</div>
)}

{/* How it works */}
<div style={{background:"#0d0d1a",borderBottom:"1px solid #1a1a2e",padding:"32px 24px"}}>
<p style={{textAlign:"center",color:"#333",fontSize:"9px",letterSpacing:"4px",marginBottom:"24px"}}>COMMENT ÇA MARCHE</p>
<div style={{display:"flex",justifyContent:"center",gap:"6px",flexWrap:"wrap",maxWidth:"680px",margin:"0 auto"}}>
{[{icon:"🛒",n:"1",label:"Commandez",desc:"Avant 5h30 du matin"},{arrow:true},{icon:"✅",n:"2",label:"Confirmation",desc:"SMS immédiat"},{arrow:true},{icon:"🌙",n:"3",label:"Livraison",desc:"22h–6h, le soir même"}].map((item,i)=>
item.arrow?(
<div key={i} style={{display:"flex",alignItems:"center",color:"#1a1a2e",fontSize:"18px",padding:"0 4px"}}>→</div>
):(
<div key={i} style={{textAlign:"center",padding:"14px 18px",background:"rgba(255,255,255,0.02)",border:"1px solid #1e1e2e",borderRadius:"8px",minWidth:"120px"}}>
<div style={{fontSize:"26px",marginBottom:"6px"}}>{item.icon}</div>
<div style={{fontSize:"9px",color:"#D4A843",letterSpacing:"2px",marginBottom:"3px"}}>ÉTAPE {item.n}</div>
<div style={{fontSize:"13px",fontWeight:600,color:"#fff",marginBottom:"3px"}}>{item.label}</div>
<div style={{fontSize:"11px",color:"#444"}}>{item.desc}</div>
</div>
)
)}
</div>
</div>

{/* Filters */}
<div style={{padding:"22px 24px 0",display:"flex",gap:"8px",justifyContent:"center",flexWrap:"wrap"}}>
{[{key:"tous",label:"✨ Tout"},{key:"packs",label:"🎁 Packs"},{key:"biere",label:"🍺 Bières"},{key:"alcool",label:"🥃 Spiritueux"},{key:"vin",label:"🍷 Vins"},{key:"champagne",label:"🥂 Champagne"},{key:"soft",label:"🥤 Softs"},{key:"accessoire",label:"🧊 Accessoires"},{key:"apero",label:"🥜 Apéros"}].map(({key,label})=>(
<button key={key} onClick={()=>setFilter(key)} style={{padding:"7px 18px",borderRadius:"20px",cursor:"pointer",background:filter===key?"#D4A843":"transparent",color:filter===key?"#0a0a0a":"#555",border:`1px solid ${filter===key?"#D4A843":"#1e1e2e"}`,fontFamily:"'DM Sans',sans-serif",fontSize:"11px",fontWeight:600,letterSpacing:"1px",transition:"all 0.2s"}}>{label}</button>
))}
</div>

{/* Products */}
<div style={{padding:"20px 24px",maxWidth:"1200px",margin:"0 auto"}}>
{showPacks&&(
<div style={{marginBottom:filter==="tous"?"32px":"0"}}>
{filter==="tous"&&<p style={{color:"#D4A843",fontSize:"9px",letterSpacing:"4px",marginBottom:"14px"}}>PACKS SOIRÉE — ÉCONOMISEZ JUSQU'À 18%</p>}
<div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(255px,1fr))",gap:"16px"}}>
{PACKS.map((pack,i)=>(
<div key={pack.id} className="card fade-up" style={{background:"linear-gradient(135deg,#111118,#0d1020)",border:"1px solid #2a1a3e",borderRadius:"10px",overflow:"hidden",animationDelay:`${i*60}ms`,position:"relative"}}>
<div style={{position:"absolute",top:"12px",left:"12px",background:pack.badgeColor,color:"#0a0a0a",fontSize:"9px",fontWeight:700,padding:"3px 10px",borderRadius:"10px",letterSpacing:"1px",zIndex:1}}>{pack.badge}</div>
<div style={{background:"radial-gradient(ellipse at top,#1a0d2e,#0a0a18)",height:"110px",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"52px"}}>{pack.emoji}</div>
<div style={{padding:"16px"}}>
<h3 style={{fontFamily:"'Playfair Display',serif",fontSize:"15px",fontWeight:700,color:"#fff",marginBottom:"6px"}}>{pack.name}</h3>
<p style={{color:"#3a3a4a",fontSize:"11px",marginBottom:"10px",lineHeight:1.5}}>{pack.desc}</p>
<div style={{marginBottom:"12px"}}>{pack.items.map(item=><p key={item} style={{color:"#444",fontSize:"11px",lineHeight:1.7}}>• {item}</p>)}</div>
<div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginTop:"12px",paddingTop:"12px",borderTop:"1px solid #1a1a2e"}}>
<div>
<span style={{fontFamily:"'Playfair Display',serif",fontSize:"20px",fontWeight:700,color:"#D4A843"}}>{pack.price.toFixed(2)} €</span>
<span style={{color:"#2a2a3a",fontSize:"11px",textDecoration:"line-through",marginLeft:"6px"}}>{pack.originalPrice.toFixed(2)} €</span>
</div>
<button onClick={()=>addToCart(pack,true)} style={{background:added===pack.id?"#2ecc71":"#D4A843",color:"#0a0a0a",border:"none",padding:"8px 14px",borderRadius:"4px",cursor:"pointer",fontFamily:"'DM Sans',sans-serif",fontSize:"10px",fontWeight:700,letterSpacing:"1px",transition:"all 0.3s"}}>
{added===pack.id?"✓ AJOUTÉ":"+ PANIER"}
</button>
</div>
</div>
</div>
))}
</div>
</div>
)}

{filter!=="packs"&&(
<>
{filter==="tous"&&<p style={{color:"#D4A843",fontSize:"9px",letterSpacing:"4px",marginBottom:"14px"}}>TOUS LES PRODUITS</p>}
<div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(240px,1fr))",gap:"16px"}}>
{filtered.map((p,i)=>(
<div key={p.id} className="card fade-up" style={{background:"#111118",border:"1px solid #1a1a2e",borderRadius:"8px",overflow:"hidden",animationDelay:`${i*40}ms`}}>
<div style={{background:"radial-gradient(ellipse at top,#0d1a2e,#0a0a12)",height:"108px",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"50px",position:"relative"}}>
{p.emoji}
{(()=>{const b=getBadge(p);return b.text?(<span style={{position:"absolute",top:"10px",right:"10px",background:b.bg,color:b.color,border:b.border?`1px solid ${b.border}`:"none",fontSize:"9px",fontWeight:700,padding:"2px 8px",borderRadius:"8px"}}>{b.text}</span>):null;})()}
</div>
<div style={{padding:"14px"}}>
<div style={{fontSize:"8px",color:"#D4A843",letterSpacing:"3px",marginBottom:"4px"}}>{p.type.toUpperCase()}</div>
<h3 style={{fontFamily:"'Playfair Display',serif",fontSize:"14px",fontWeight:700,marginBottom:"6px",color:"#fff"}}>{p.name}</h3>
<p style={{color:"#3a3a4a",fontSize:"11px",lineHeight:1.6,marginBottom:"12px"}}>{p.desc}</p>
<div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
<span style={{fontFamily:"'Playfair Display',serif",fontSize:"17px",fontWeight:700,color:"#D4A843"}}>{p.price.toFixed(2)} €</span>
<button onClick={()=>addToCart(p)} style={{background:added===p.id?"#2ecc71":"#D4A843",color:"#0a0a0a",border:"none",padding:"7px 13px",borderRadius:"4px",cursor:"pointer",fontFamily:"'DM Sans',sans-serif",fontSize:"10px",fontWeight:700,letterSpacing:"1px",transition:"all 0.3s"}}>
{added===p.id?"✓ AJOUTÉ":"+ PANIER"}
</button>
</div>
</div>
</div>
))}
</div>
</>
)}
</div>

{/* Reviews */}
<div style={{background:"#0d0d1a",borderTop:"1px solid #1a1a2e",padding:"48px 24px",marginTop:"20px"}}>
<div style={{maxWidth:"1100px",margin:"0 auto"}}>
<div style={{textAlign:"center",marginBottom:"32px"}}>
<p style={{color:"#D4A843",fontSize:"9px",letterSpacing:"4px",marginBottom:"8px"}}>ILS NOUS FONT CONFIANCE</p>
<h3 style={{fontFamily:"'Playfair Display',serif",fontSize:"22px",color:"#fff",marginBottom:"8px"}}>Avis de nos clients</h3>
<div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:"4px"}}>
{"★★★★★".split("").map((s,i)=><span key={i} style={{color:"#D4A843",fontSize:"18px"}}>{s}</span>)}
<span style={{color:"#555",fontSize:"12px",marginLeft:"6px"}}>4.8/5 · {REVIEWS.length} avis</span>
</div>
</div>
<div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:"16px"}}>
{REVIEWS.map((r,i)=>(
<div key={r.id} className="fade-up" style={{background:"#111118",border:"1px solid #1a1a2e",borderRadius:"10px",padding:"20px",animationDelay:`${i*80}ms`}}>
<div style={{display:"flex",alignItems:"center",gap:"10px",marginBottom:"12px"}}>
<span style={{fontSize:"30px"}}>{r.avatar}</span>
<div style={{flex:1}}>
<p style={{fontWeight:700,fontSize:"13px",color:"#ddd"}}>{r.name}</p>
<p style={{color:"#333",fontSize:"11px"}}>{r.date}</p>
</div>
<div style={{display:"flex",gap:"2px"}}>
{[...Array(5)].map((_,j)=><span key={j} style={{color:j<r.stars?"#D4A843":"#1a1a2e",fontSize:"12px"}}>★</span>)}
</div>
</div>
<p style={{color:"#666",fontSize:"13px",lineHeight:1.7,fontStyle:"italic"}}>"{r.text}"</p>
</div>
))}
</div>
<div style={{textAlign:"center",marginTop:"32px",padding:"24px",background:"rgba(212,168,67,0.04)",border:"1px solid #D4A84322",borderRadius:"10px"}}>
<p style={{color:"#D4A843",fontSize:"13px",fontWeight:600,marginBottom:"6px"}}>Vous avez commandé chez nous ?</p>
<p style={{color:"#444",fontSize:"12px",marginBottom:"14px"}}>Laissez votre avis sur Instagram — ça nous aide énormément 🙏</p>
<div style={{display:"flex",gap:"10px",justifyContent:"center",flexWrap:"wrap"}}>
<a href="https://instagram.com/Lekeisen_night" target="_blank" rel="noreferrer" style={{background:"rgba(225,48,108,0.1)",border:"1px solid #E1306C44",color:"#E1306C",padding:"8px 18px",borderRadius:"6px",textDecoration:"none",fontSize:"12px",fontWeight:600}}>📸 Nous taguer sur Instagram</a>
<a href="https://wa.me/33652336156" target="_blank" rel="noreferrer" style={{background:"rgba(37,211,102,0.1)",border:"1px solid #25D36644",color:"#25D366",padding:"8px 18px",borderRadius:"6px",textDecoration:"none",fontSize:"12px",fontWeight:600}}>💬 Nous écrire sur WhatsApp</a>
</div>
</div>
</div>
</div>

{/* Footer */}
<footer style={{background:"#07070f",borderTop:"1px solid #1a1a2e",padding:"36px 24px",textAlign:"center",marginTop:"0"}}>
<div style={{marginBottom:"10px",display:"flex",justifyContent:"center"}}><MoonLogo size={38}/></div>
<p style={{color:"#D4A843",fontFamily:"'Playfair Display',serif",fontSize:"15px",marginBottom:"6px"}}>{SHOP_NAME}</p>
<p style={{color:"#2ecc71",fontSize:"11px",marginBottom:"12px"}}>🌙 Livraison nocturne 22h–6h · 91 · 94 · 77</p>
<div style={{display:"flex",justifyContent:"center",gap:"16px",marginBottom:"16px",flexWrap:"wrap"}}>
<button onClick={()=>setPage("contact")} style={{background:"transparent",border:"none",color:"#333",cursor:"pointer",fontFamily:"'DM Sans',sans-serif",fontSize:"11px",textDecoration:"underline"}}>Contact</button>
<span style={{color:"#1a1a2e"}}>|</span>
<button onClick={()=>setPage("tracking")} style={{background:"transparent",border:"none",color:"#333",cursor:"pointer",fontFamily:"'DM Sans',sans-serif",fontSize:"11px",textDecoration:"underline"}}>📦 Suivi commande</button>
<span style={{color:"#1a1a2e"}}>|</span>
<button onClick={()=>setPage("cgv")} style={{background:"transparent",border:"none",color:"#333",cursor:"pointer",fontFamily:"'DM Sans',sans-serif",fontSize:"11px",textDecoration:"underline"}}>CGV</button>
<span style={{color:"#1a1a2e"}}>|</span>
<span style={{color:"#333",fontSize:"11px"}}>Mentions légales</span>
</div>
<p style={{color:"#1a1a2e",fontSize:"10px",lineHeight:2}}>
L'abus d'alcool est dangereux pour la santé. À consommer avec modération.<br/>
Vente interdite aux mineurs de moins de 18 ans. · © 2026 {SHOP_NAME}
</p>
</footer>

{/* Cart */}
{cartOpen&&(
<div style={{position:"fixed",inset:0,zIndex:200}}>
<div onClick={()=>setCartOpen(false)} style={{position:"absolute",inset:0,background:"rgba(0,0,0,0.8)"}}/>
<div style={{position:"absolute",right:0,top:0,bottom:0,width:"min(390px,100vw)",background:"#0d0d1a",borderLeft:"1px solid #1a1a2e",display:"flex",flexDirection:"column",animation:"slideIn 0.3s ease"}}>
<div style={{padding:"18px 20px",borderBottom:"1px solid #1a1a2e",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
<h2 style={{fontFamily:"'Playfair Display',serif",fontSize:"17px"}}>Votre Panier</h2>
<button onClick={()=>setCartOpen(false)} style={{background:"none",border:"none",color:"#aaa",fontSize:"22px",cursor:"pointer"}}>×</button>
</div>
{zone?(<div style={{margin:"10px 16px 0",background:`${zone.color}10`,border:`1px solid ${zone.color}33`,borderRadius:"6px",padding:"9px 12px"}}>
<p style={{color:zone.color,fontSize:"11px",fontWeight:600}}>📍 {zone.label} · Min. {zone.minOrder} € · Gratuite dès 30 €</p>
</div>):(
<div onClick={()=>{setCartOpen(false);setShowZone(true);}} style={{margin:"10px 16px 0",background:"rgba(212,168,67,0.05)",border:"1px solid #D4A84333",borderRadius:"6px",padding:"9px 12px",cursor:"pointer"}}>
<p style={{color:"#D4A843",fontSize:"11px",fontWeight:600}}>📍 Choisir ma zone de livraison →</p>
</div>
)}
{!open&&<div style={{margin:"8px 16px 0",background:"rgba(230,126,34,0.06)",border:"1px solid #e67e2222",borderRadius:"6px",padding:"9px 12px"}}>
<p style={{color:"#e67e22",fontSize:"11px"}}>😴 Fermé — commandez maintenant, livré dès 22h</p>
</div>}
<div style={{flex:1,overflowY:"auto",padding:"12px 16px"}}>
{cart.length===0?<p style={{color:"#2a2a3a",textAlign:"center",marginTop:"40px"}}>Votre panier est vide</p>:cart.map(item=>(
<div key={item.id} style={{display:"flex",gap:"10px",padding:"11px 0",borderBottom:"1px solid #1a1a2e",alignItems:"center"}}>
<span style={{fontSize:"24px"}}>{item.emoji}</span>
<div style={{flex:1}}>
<p style={{fontWeight:600,fontSize:"12px",color:"#ddd"}}>{item.name}</p>
<p style={{color:"#D4A843",fontSize:"12px"}}>{(item.price*item.qty).toFixed(2)} €</p>
</div>
<div style={{display:"flex",alignItems:"center",gap:"5px"}}>
<button onClick={()=>updateQty(item.id,-1)} style={{background:"#1a1a2e",border:"1px solid #2a2a3e",color:"#fff",width:"22px",height:"22px",borderRadius:"3px",cursor:"pointer",fontSize:"12px"}}>−</button>
<span style={{fontSize:"12px",minWidth:"16px",textAlign:"center"}}>{item.qty}</span>
<button onClick={()=>updateQty(item.id,1)} style={{background:"#1a1a2e",border:"1px solid #2a2a3e",color:"#fff",width:"22px",height:"22px",borderRadius:"3px",cursor:"pointer",fontSize:"12px"}}>+</button>
<button onClick={()=>removeFromCart(item.id)} style={{background:"none",border:"none",color:"#2a2a3a",cursor:"pointer",fontSize:"13px",marginLeft:"2px"}}>🗑</button>
</div>
</div>
))}
</div>
{cart.length>0&&(
<div style={{padding:"14px 18px",borderTop:"1px solid #1a1a2e"}}>
<div style={{marginBottom:"10px",paddingBottom:"10px",borderBottom:"1px solid #1a1a2e"}}>
{appliedPromo?(
<div style={{display:"flex",justifyContent:"space-between",alignItems:"center",background:"rgba(46,204,113,0.08)",border:"1px solid #2ecc7133",borderRadius:"6px",padding:"8px 12px"}}>
<span style={{color:"#2ecc71",fontSize:"11px",fontWeight:600}}>🎁 {appliedPromo.label||`−${appliedPromo.discount}${appliedPromo.type==="percent"?"%":" €"}`}</span>
<button onClick={removePromo} style={{background:"none",border:"none",color:"#555",cursor:"pointer",fontSize:"13px"}}>✕</button>
</div>
):(
<div>
<div style={{display:"flex",gap:"6px"}}>
<input value={promoCode} onChange={e=>setPromoCode(e.target.value.toUpperCase())} placeholder="Code promo" style={{flex:1,padding:"8px 10px",background:"#111118",border:"1px solid #1a1a2e",borderRadius:"4px",color:"#fff",fontFamily:"'DM Sans',sans-serif",fontSize:"12px",outline:"none"}}/>
<button onClick={applyPromo} style={{background:"#D4A843",color:"#0a0a0a",border:"none",padding:"8px 12px",borderRadius:"4px",cursor:"pointer",fontFamily:"'DM Sans',sans-serif",fontSize:"11px",fontWeight:700}}>OK</button>
</div>
{promoError&&<p style={{color:"#e74c3c",fontSize:"10px",marginTop:"4px"}}>{promoError}</p>}
{promoSuccess&&<p style={{color:"#2ecc71",fontSize:"10px",marginTop:"4px"}}>{promoSuccess}</p>}
</div>
)}
</div>
<div style={{display:"flex",justifyContent:"space-between",marginBottom:"3px"}}><span style={{color:"#555",fontSize:"12px"}}>Sous-total</span><span style={{color:"#bbb",fontSize:"12px"}}>{subtotal.toFixed(2)} €</span></div>
{appliedPromo&&<div style={{display:"flex",justifyContent:"space-between",marginBottom:"3px"}}><span style={{color:"#2ecc71",fontSize:"12px"}}>🎁 Réduction</span><span style={{color:"#2ecc71",fontSize:"12px"}}>−{promoDiscount.toFixed(2)} €</span></div>}
<div style={{display:"flex",justifyContent:"space-between",marginBottom:"6px"}}><span style={{color:"#555",fontSize:"12px"}}>Livraison</span><span style={{color:deliveryFee===0?"#2ecc71":"#bbb",fontSize:"12px"}}>{deliveryFee===0?"Gratuite 🎉":`${deliveryFee.toFixed(2)} €`}</span></div>
{discountedSubtotal<30&&<p style={{color:"#2a2a3a",fontSize:"10px",marginBottom:"3px"}}>Encore {(30-discountedSubtotal).toFixed(2)} € pour la livraison gratuite</p>}
{zone&&!canOrder&&<p style={{color:"#e74c3c",fontSize:"10px",marginBottom:"6px"}}>⚠️ Min. {zone.minOrder} € pour {zone.label}</p>}
<div style={{display:"flex",justifyContent:"space-between",marginBottom:"12px",paddingTop:"8px",borderTop:"1px solid #1a1a2e"}}>
<span style={{color:"#aaa",fontWeight:600,fontSize:"13px"}}>Total</span>
<span style={{fontFamily:"'Playfair Display',serif",fontSize:"17px",color:"#D4A843"}}>{total.toFixed(2)} €</span>
</div>
<button onClick={()=>{if(!zone){setCartOpen(false);setShowZone(true);return;}if(!canOrder)return;setCartOpen(false);setCheckoutStep("form");}}
style={{width:"100%",background:(!zone||!canOrder)?"#1a1a2e":"#D4A843",color:(!zone||!canOrder)?"#444":"#0a0a0a",border:"none",padding:"12px",fontSize:"11px",fontWeight:700,letterSpacing:"2px",cursor:(!zone||!canOrder)?"not-allowed":"pointer",borderRadius:"4px",fontFamily:"'DM Sans',sans-serif"}}>
{!zone?"CHOISIR MA ZONE D'ABORD":!canOrder?`MIN. ${zone.minOrder} € REQUIS`:"COMMANDER →"}
</button>
</div>
)}
</div>
</div>
)}

{/* Checkout */}
{checkoutStep==="form"&&(
<div style={{position:"fixed",inset:0,zIndex:300,background:"rgba(0,0,0,0.92)",display:"flex",alignItems:"center",justifyContent:"center",padding:"16px"}}>
<div style={{background:"#0d0d1a",border:"1px solid #1a1a2e",borderRadius:"10px",padding:"30px",maxWidth:"460px",width:"100%",maxHeight:"90vh",overflowY:"auto"}}>
<div style={{display:"flex",alignItems:"center",gap:"10px",marginBottom:"18px"}}>
<MoonLogo size={24}/><h2 style={{fontFamily:"'Playfair Display',serif",fontSize:"18px",color:"#D4A843"}}>Finaliser la commande</h2>
</div>
{zone&&<div style={{background:`${zone.color}10`,border:`1px solid ${zone.color}33`,borderRadius:"6px",padding:"9px 14px",marginBottom:"14px"}}>
<p style={{color:zone.color,fontSize:"11px",fontWeight:600}}>📍 {zone.label} · 🌙 22h–6h · 🚚 {deliveryFee===0?"Livraison gratuite":`+${deliveryFee.toFixed(2)} €`}</p>
</div>}
<div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"8px",marginBottom:"8px"}}>
{[["Prénom","prenom"],["Nom","nom"],["Email","email"],["Téléphone","tel"],["Adresse complète","adresse"],["Ville","ville"],["Code postal","cp"]].map(([label,key])=>(
<input key={key} placeholder={label} value={form[key]} onChange={e=>setForm(f=>({...f,[key]:e.target.value}))}
style={{gridColumn:["Email","Adresse complète","Téléphone"].includes(label)?"span 2":"span 1",padding:"10px",background:"#111118",border:"1px solid #1a1a2e",borderRadius:"4px",color:"#fff",fontFamily:"'DM Sans',sans-serif",fontSize:"12px",outline:"none"}}/>
))}
</div>
<div style={{background:"#111118",border:"1px solid #1a1a2e",borderRadius:"4px",padding:"14px",marginBottom:"14px",marginTop:"6px"}}>
<p style={{color:"#333",fontSize:"9px",marginBottom:"8px",letterSpacing:"1px"}}>PAIEMENT SÉCURISÉ — STRIPE</p>
<input placeholder="Numéro de carte" style={{width:"100%",padding:"9px",background:"#0d0d1a",border:"1px solid #1a1a2e",borderRadius:"4px",color:"#fff",fontFamily:"'DM Sans',sans-serif",fontSize:"12px",outline:"none",marginBottom:"6px"}}/>
<div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"6px"}}>
<input placeholder="MM/AA" style={{padding:"9px",background:"#0d0d1a",border:"1px solid #1a1a2e",borderRadius:"4px",color:"#fff",fontFamily:"'DM Sans',sans-serif",fontSize:"12px",outline:"none"}}/>
<input placeholder="CVC" style={{padding:"9px",background:"#0d0d1a",border:"1px solid #1a1a2e",borderRadius:"4px",color:"#fff",fontFamily:"'DM Sans',sans-serif",fontSize:"12px",outline:"none"}}/>
</div>
</div>
<div style={{background:"#111118",borderRadius:"6px",padding:"10px 14px",marginBottom:"14px"}}>
<div style={{display:"flex",justifyContent:"space-between",marginBottom:"3px"}}><span style={{color:"#555",fontSize:"11px"}}>Sous-total</span><span style={{color:"#bbb",fontSize:"11px"}}>{subtotal.toFixed(2)} €</span></div>
{appliedPromo&&<div style={{display:"flex",justifyContent:"space-between",marginBottom:"3px"}}><span style={{color:"#2ecc71",fontSize:"11px"}}>🎁 Réduction</span><span style={{color:"#2ecc71",fontSize:"11px"}}>−{promoDiscount.toFixed(2)} €</span></div>}
<div style={{display:"flex",justifyContent:"space-between",marginBottom:"6px"}}><span style={{color:"#555",fontSize:"11px"}}>Livraison</span><span style={{color:deliveryFee===0?"#2ecc71":"#bbb",fontSize:"11px"}}>{deliveryFee===0?"Gratuite 🎉":`${deliveryFee.toFixed(2)} €`}</span></div>
<div style={{display:"flex",justifyContent:"space-between",paddingTop:"6px",borderTop:"1px solid #1a1a2e"}}>
<span style={{color:"#aaa",fontWeight:600,fontSize:"12px"}}>Total</span>
<span style={{fontFamily:"'Playfair Display',serif",fontSize:"17px",color:"#D4A843",fontWeight:700}}>{total.toFixed(2)} €</span>
</div>
</div>
<button onClick={confirmOrder} style={{width:"100%",background:"#D4A843",color:"#0a0a0a",border:"none",padding:"12px",fontSize:"11px",fontWeight:700,letterSpacing:"2px",cursor:"pointer",borderRadius:"4px",marginBottom:"8px",fontFamily:"'DM Sans',sans-serif"}}>PAYER {total.toFixed(2)} € →</button>
<button onClick={()=>setCheckoutStep(null)} style={{width:"100%",background:"none",border:"none",color:"#444",cursor:"pointer",fontFamily:"'DM Sans',sans-serif",fontSize:"11px"}}>← Retour</button>
</div>
</div>
)}

{checkoutStep==="success"&&(
<div style={{position:"fixed",inset:0,zIndex:300,background:"rgba(0,0,0,0.95)",display:"flex",alignItems:"center",justifyContent:"center"}}>
<div style={{textAlign:"center",padding:"40px",maxWidth:"360px"}}>
<div style={{marginBottom:"14px",display:"flex",justifyContent:"center"}}><MoonLogo size={60}/></div>
<h2 style={{fontFamily:"'Playfair Display',serif",fontSize:"24px",color:"#D4A843",marginBottom:"10px"}}>Commande confirmée !</h2>
<p style={{color:"#888",marginBottom:"6px",fontSize:"13px"}}>Merci pour votre commande.</p>
<p style={{color:"#2ecc71",fontSize:"12px",marginBottom:"4px"}}>🌙 Livraison cette nuit entre 22h et 6h</p>
{zone&&<p style={{color:"#555",fontSize:"11px",marginBottom:"4px"}}>📍 {zone.label} — Dép. {zone.dept.join(", ")}</p>}
<p style={{color:"#333",fontSize:"11px",marginBottom:"26px"}}>Un SMS de confirmation vous sera envoyé.</p>
<button onClick={()=>{setCheckoutStep(null);setPage("tracking");}} style={{background:"transparent",border:"1px solid #D4A84355",color:"#D4A843":"1px solid #D4A84355",padding:"10px 24px",fontSize:"11px",fontWeight:700,letterSpacing:"1px",cursor:"pointer",borderRadius:"4px",fontFamily:"'DM Sans',sans-serif",marginBottom:"10px",width:"100%"}}>📦 SUIVRE MA COMMANDE</button>
<button onClick={()=>setCheckoutStep(null)} style={{background:"#D4A843",color:"#0a0a0a",border:"none",padding:"12px 28px",fontSize:"11px",fontWeight:700,letterSpacing:"2px",cursor:"pointer",borderRadius:"4px",fontFamily:"'DM Sans',sans-serif"}}>RETOUR À LA BOUTIQUE</button>
</div>
</div>
)}

{/* WhatsApp */}
<a href="https://wa.me/33652336156?text=Bonjour%20Le%20Keïsen%20Night%2C%20je%20voudrais%20passer%20commande%20🌙" target="_blank" rel="noreferrer"
style={{position:"fixed",bottom:"24px",right:"24px",zIndex:500,background:"#25D366",borderRadius:"50%",width:"56px",height:"56px",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 4px 20px rgba(37,211,102,0.4)",textDecoration:"none",animation:"waFloat 3s ease-in-out infinite"}}
onMouseOver={e=>{e.currentTarget.style.transform="scale(1.1)";}} onMouseOut={e=>{e.currentTarget.style.transform="scale(1)";}}>
<svg width="26" height="26" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
</a>
</div>
);
}

// ─── CONTACT & CGV (pages internes boutique) ─────────────────
const TrackingPage = ({orders, onClose}) => {
const [searchId, setSearchId] = useState("");
const [searchPhone, setSearchPhone] = useState("");
const [result, setResult] = useState(null);
const [searched, setSearched] = useState(false);

const STATUS_STEPS = ["en attente", "en cours", "livré"];

const handleSearch = () => {
if (!searchId && !searchPhone) return;
const found = orders.find(o =>
(searchId && o.id.toLowerCase() === searchId.trim().toLowerCase()) ||
(searchPhone && o.phone.replace(/\s/g,"").includes(searchPhone.replace(/\s/g,"")))
);
setResult(found || null);
setSearched(true);
};

const getStepIndex = (status) => {
if (status === "annulé") return -1;
return STATUS_STEPS.indexOf(status);
};

const stepIndex = result ? getStepIndex(result.status) : -1;

const STEP_INFO = [
{ icon: "✅", label: "Commande reçue", desc: "Votre commande a été confirmée" },
{ icon: "🛵", label: "En livraison", desc: "Le livreur est en route vers vous" },
{ icon: "🌙", label: "Livré", desc: "Votre commande a été livrée" },
];

return (
<div style={{position:"fixed",inset:0,zIndex:300,background:"#0a0a12",overflowY:"auto"}}>
<div style={{maxWidth:"600px",margin:"0 auto",padding:"40px 24px"}}>
<button onClick={onClose} style={{background:"none",border:"1px solid #1a1a2e",color:"#aaa",padding:"8px 16px",borderRadius:"4px",cursor:"pointer",fontFamily:"'DM Sans',sans-serif",fontSize:"12px",marginBottom:"32px"}}>← Retour</button>

{/* Header */}
<div style={{textAlign:"center",marginBottom:"36px"}}>
<div style={{fontSize:"48px",marginBottom:"12px"}}>📦</div>
<h1 style={{fontFamily:"'Playfair Display',serif",fontSize:"26px",color:"#D4A843",marginBottom:"6px"}}>Suivi de commande</h1>
<p style={{color:"#555",fontSize:"13px"}}>Entrez votre numéro de commande ou votre téléphone</p>
</div>

{/* Search */}
<div style={{background:"#111118",border:"1px solid #1a1a2e",borderRadius:"10px",padding:"24px",marginBottom:"24px"}}>
<div style={{marginBottom:"12px"}}>
<label style={{color:"#555",fontSize:"10px",letterSpacing:"2px",display:"block",marginBottom:"6px"}}>NUMÉRO DE COMMANDE</label>
<input value={searchId} onChange={e=>setSearchId(e.target.value.toUpperCase())} placeholder="Ex : KN-001"
style={{width:"100%",padding:"12px",background:"#0d0d1a",border:"1px solid #1a1a2e",borderRadius:"6px",color:"#fff",fontFamily:"'DM Sans',sans-serif",fontSize:"13px",outline:"none"}}
onKeyDown={e=>e.key==="Enter"&&handleSearch()}/>
</div>
<div style={{display:"flex",alignItems:"center",gap:"10px",marginBottom:"12px"}}>
<div style={{flex:1,height:"1px",background:"#1a1a2e"}}/>
<span style={{color:"#333",fontSize:"11px"}}>OU</span>
<div style={{flex:1,height:"1px",background:"#1a1a2e"}}/>
</div>
<div style={{marginBottom:"16px"}}>
<label style={{color:"#555",fontSize:"10px",letterSpacing:"2px",display:"block",marginBottom:"6px"}}>NUMÉRO DE TÉLÉPHONE</label>
<input value={searchPhone} onChange={e=>setSearchPhone(e.target.value)} placeholder="Ex : 06 52 33 61 56"
style={{width:"100%",padding:"12px",background:"#0d0d1a",border:"1px solid #1a1a2e",borderRadius:"6px",color:"#fff",fontFamily:"'DM Sans',sans-serif",fontSize:"13px",outline:"none"}}
onKeyDown={e=>e.key==="Enter"&&handleSearch()}/>
</div>
<button onClick={handleSearch} style={{width:"100%",background:"#D4A843",color:"#0a0a0a",border:"none",padding:"13px",borderRadius:"6px",cursor:"pointer",fontFamily:"'DM Sans',sans-serif",fontSize:"12px",fontWeight:700,letterSpacing:"2px"}}>
RECHERCHER MA COMMANDE →
</button>
</div>

{/* Not found */}
{searched && !result && (
<div style={{background:"rgba(231,76,60,0.08)",border:"1px solid #e74c3c33",borderRadius:"10px",padding:"24px",textAlign:"center",animation:"slideIn 0.3s ease"}}>
<p style={{fontSize:"32px",marginBottom:"10px"}}>😕</p>
<p style={{color:"#e74c3c",fontWeight:700,fontSize:"14px",marginBottom:"6px"}}>Commande introuvable</p>
<p style={{color:"#666",fontSize:"12px"}}>Vérifiez votre numéro de commande ou téléphone.</p>
<p style={{color:"#555",fontSize:"12px",marginTop:"8px"}}>Besoin d'aide ? <a href="https://wa.me/33652336156" target="_blank" rel="noreferrer" style={{color:"#25D366",textDecoration:"none"}}>Contactez-nous sur WhatsApp</a></p>
</div>
)}

{/* Result */}
{result && (
<div style={{animation:"slideIn 0.3s ease"}}>
{/* Status card */}
<div style={{background:"#111118",border:`1px solid ${result.status==="annulé"?"#e74c3c33":"#D4A84333"}`,borderRadius:"10px",padding:"24px",marginBottom:"16px"}}>
<div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:"16px",flexWrap:"wrap",gap:"8px"}}>
<div>
<p style={{color:"#D4A843",fontWeight:700,fontSize:"16px",marginBottom:"2px"}}>{result.id}</p>
<p style={{color:"#555",fontSize:"12px"}}>Passée le {result.date} à {result.time}</p>
</div>
{result.status === "annulé" ? (
<span style={{background:"rgba(231,76,60,0.12)",color:"#e74c3c",border:"1px solid #e74c3c33",padding:"5px 14px",borderRadius:"8px",fontSize:"12px",fontWeight:700}}>ANNULÉE</span>
) : (
<span style={{background:"rgba(46,204,113,0.12)",color:"#2ecc71",border:"1px solid #2ecc7133",padding:"5px 14px",borderRadius:"8px",fontSize:"12px",fontWeight:700}}>
{result.status === "livré" ? "✅ LIVRÉE" : "🔄 EN COURS"}
</span>
)}
</div>

{/* Progress bar */}
{result.status !== "annulé" && (
<div style={{marginBottom:"20px"}}>
<div style={{display:"flex",justifyContent:"space-between",position:"relative",marginBottom:"8px"}}>
{/* Progress line */}
<div style={{position:"absolute",top:"16px",left:"16px",right:"16px",height:"2px",background:"#1a1a2e",zIndex:0}}/>
<div style={{position:"absolute",top:"16px",left:"16px",height:"2px",background:"#D4A843",zIndex:1,transition:"width 0.8s ease",width:`${stepIndex===0?"0%":stepIndex===1?"50%":"100%"}`}}/>
{STEP_INFO.map((step,i)=>(
<div key={i} style={{display:"flex",flexDirection:"column",alignItems:"center",gap:"6px",zIndex:2,flex:1}}>
<div style={{width:"32px",height:"32px",borderRadius:"50%",background:i<=stepIndex?"#D4A843":"#1a1a2e",border:`2px solid ${i<=stepIndex?"#D4A843":"#2a2a3e"}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"14px",transition:"all 0.5s"}}>
{i<=stepIndex?step.icon:<span style={{color:"#333",fontSize:"10px"}}>{i+1}</span>}
</div>
<p style={{color:i<=stepIndex?"#D4A843":"#333",fontSize:"10px",fontWeight:i<=stepIndex?700:400,textAlign:"center",maxWidth:"80px"}}>{step.label}</p>
</div>
))}
</div>
<p style={{color:"#666",fontSize:"12px",textAlign:"center",marginTop:"8px"}}>
{stepIndex===0 && "⏳ Votre commande est confirmée, le livreur va bientôt partir."}
{stepIndex===1 && "🛵 Le livreur est en route ! Restez disponible à votre adresse."}
{stepIndex===2 && "🎉 Votre commande a été livrée. Bonne soirée !"}
</p>
</div>
)}

{result.status === "annulé" && (
<p style={{color:"#e74c3c",fontSize:"13px",marginBottom:"16px"}}>Cette commande a été annulée. Pour toute question, contactez-nous sur WhatsApp.</p>
)}

{/* Order details */}
<div style={{borderTop:"1px solid #1a1a2e",paddingTop:"16px"}}>
<div style={{display:"flex",flexDirection:"column",gap:"8px",marginBottom:"12px"}}>
<div style={{display:"flex",justifyContent:"space-between"}}>
<span style={{color:"#555",fontSize:"12px"}}>Client</span>
<span style={{color:"#ccc",fontSize:"12px"}}>{result.client}</span>
</div>
<div style={{display:"flex",justifyContent:"space-between"}}>
<span style={{color:"#555",fontSize:"12px"}}>Adresse</span>
<span style={{color:"#ccc",fontSize:"12px",textAlign:"right",maxWidth:"200px"}}>{result.address}</span>
</div>
<div style={{display:"flex",justifyContent:"space-between"}}>
<span style={{color:"#555",fontSize:"12px"}}>Zone</span>
<span style={{color:"#ccc",fontSize:"12px"}}>{result.zone}</span>
</div>
{result.promo && (
<div style={{display:"flex",justifyContent:"space-between"}}>
<span style={{color:"#555",fontSize:"12px"}}>Code promo</span>
<span style={{color:"#9b59b6",fontSize:"12px",fontWeight:600}}>🎁 {result.promo}</span>
</div>
)}
</div>
<p style={{color:"#444",fontSize:"10px",letterSpacing:"2px",marginBottom:"8px"}}>ARTICLES :</p>
{result.items.map(item=>(
<p key={item} style={{color:"#666",fontSize:"12px",lineHeight:1.8}}>• {item}</p>
))}
<div style={{display:"flex",justifyContent:"space-between",marginTop:"12px",paddingTop:"12px",borderTop:"1px solid #1a1a2e"}}>
<span style={{color:"#888",fontWeight:600}}>Total payé</span>
<span style={{fontFamily:"'Playfair Display',serif",fontSize:"20px",color:"#D4A843",fontWeight:700}}>{result.total.toFixed(2)} €</span>
</div>
</div>
</div>

{/* Help */}
<div style={{background:"rgba(37,211,102,0.05)",border:"1px solid #25D36622",borderRadius:"10px",padding:"18px",display:"flex",alignItems:"center",gap:"14px"}}>
<span style={{fontSize:"28px"}}>💬</span>
<div>
<p style={{color:"#ccc",fontSize:"13px",fontWeight:600,marginBottom:"3px"}}>Un problème avec votre commande ?</p>
<a href="https://wa.me/33652336156" target="_blank" rel="noreferrer" style={{color:"#25D366",fontSize:"12px",textDecoration:"none",fontWeight:600}}>Contactez-nous sur WhatsApp → 06 52 33 61 56</a>
</div>
</div>
</div>
)}
</div>
</div>
);
};

const ContactPageShop = ({onClose}) => (
<div style={{position:"fixed",inset:0,zIndex:300,background:"#0a0a12",overflowY:"auto"}}>
<div style={{maxWidth:"600px",margin:"0 auto",padding:"40px 24px"}}>
<button onClick={onClose} style={{background:"none",border:"1px solid #1a1a2e",color:"#aaa",padding:"8px 16px",borderRadius:"4px",cursor:"pointer",fontFamily:"'DM Sans',sans-serif",fontSize:"12px",marginBottom:"32px"}}>← Retour</button>
<div style={{textAlign:"center",marginBottom:"32px"}}><MoonLogo size={48}/><h1 style={{fontFamily:"'Playfair Display',serif",fontSize:"24px",color:"#D4A843",marginTop:"12px",marginBottom:"4px"}}>Le Keïsen Night</h1><p style={{color:"#444",fontSize:"10px",letterSpacing:"4px"}}>NOUS CONTACTER</p></div>
<div style={{background:"#111118",border:"1px solid #1a1a2e",borderRadius:"10px",padding:"22px",marginBottom:"16px"}}>
<h3 style={{fontFamily:"'Playfair Display',serif",fontSize:"15px",color:"#D4A843",marginBottom:"14px"}}>📞 Nous joindre</h3>
{[{icon:"📱",label:"Téléphone / WhatsApp",value:"06 52 33 61 56",color:"#25D366"},{icon:"📧",label:"Email",value:"Hostilesm@gmail.com",color:"#D4A843"},{icon:"📍",label:"Zone",value:"91 · 94 · 77 — Île-de-France",color:"#aaa"}].map(({icon,label,value,color})=>(
<div key={label} style={{display:"flex",alignItems:"center",gap:"12px",background:"#0d0d1a",borderRadius:"8px",padding:"12px",marginBottom:"8px"}}>
<span style={{fontSize:"22px"}}>{icon}</span>
<div><p style={{color:"#444",fontSize:"10px",marginBottom:"2px"}}>{label}</p><p style={{color,fontSize:"13px",fontWeight:600}}>{value}</p></div>
</div>
))}
</div>
<div style={{background:"#111118",border:"1px solid #1a1a2e",borderRadius:"10px",padding:"22px",marginBottom:"16px"}}>
<h3 style={{fontFamily:"'Playfair Display',serif",fontSize:"15px",color:"#D4A843",marginBottom:"14px"}}>📲 Réseaux sociaux</h3>
<div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"10px"}}>
{[{icon:"📸",name:"Instagram",handle:"@Lekeisen_night",color:"#E1306C",bg:"rgba(225,48,108,0.08)"},{icon:"🎵",name:"TikTok",handle:"@Lekeisen_night",color:"#69C9D0",bg:"rgba(105,201,208,0.08)"},{icon:"💬",name:"WhatsApp",handle:"Commandes rapides",color:"#25D366",bg:"rgba(37,211,102,0.08)"},{icon:"📘",name:"Facebook",handle:"Le Keïsen Night",color:"#1877F2",bg:"rgba(24,119,242,0.08)"}].map(({icon,name,handle,color,bg})=>(
<div key={name} style={{background:bg,border:`1px solid ${color}33`,borderRadius:"8px",padding:"14px",textAlign:"center",cursor:"pointer"}} onMouseOver={e=>e.currentTarget.style.borderColor=color} onMouseOut={e=>e.currentTarget.style.borderColor=`${color}33`}>
<div style={{fontSize:"26px",marginBottom:"4px"}}>{icon}</div>
<p style={{color,fontWeight:700,fontSize:"12px"}}>{name}</p>
<p style={{color:"#444",fontSize:"10px",marginTop:"2px"}}>{handle}</p>
</div>
))}
</div>
</div>
<div style={{background:"#111118",border:"1px solid #1a1a2e",borderRadius:"10px",padding:"22px"}}>
<h3 style={{fontFamily:"'Playfair Display',serif",fontSize:"15px",color:"#D4A843",marginBottom:"14px"}}>✉️ Envoyer un message</h3>
<div style={{display:"flex",flexDirection:"column",gap:"8px"}}>
<input placeholder="Votre nom" style={{padding:"11px",background:"#0d0d1a",border:"1px solid #1a1a2e",borderRadius:"4px",color:"#fff",fontFamily:"'DM Sans',sans-serif",fontSize:"12px",outline:"none"}}/>
<input placeholder="Votre email ou téléphone" style={{padding:"11px",background:"#0d0d1a",border:"1px solid #1a1a2e",borderRadius:"4px",color:"#fff",fontFamily:"'DM Sans',sans-serif",fontSize:"12px",outline:"none"}}/>
<textarea placeholder="Votre message..." rows={4} style={{padding:"11px",background:"#0d0d1a",border:"1px solid #1a1a2e",borderRadius:"4px",color:"#fff",fontFamily:"'DM Sans',sans-serif",fontSize:"12px",outline:"none",resize:"vertical"}}/>
<button style={{background:"#D4A843",color:"#0a0a0a",border:"none",padding:"12px",fontSize:"11px",fontWeight:700,letterSpacing:"2px",cursor:"pointer",borderRadius:"4px",fontFamily:"'DM Sans',sans-serif"}}>ENVOYER →</button>
</div>
</div>
</div>
</div>
);

const CGVPageShop = ({onClose}) => (
<div style={{position:"fixed",inset:0,zIndex:300,background:"#0a0a12",overflowY:"auto"}}>
<div style={{maxWidth:"760px",margin:"0 auto",padding:"40px 24px"}}>
<button onClick={onClose} style={{background:"none",border:"1px solid #1a1a2e",color:"#aaa",padding:"8px 16px",borderRadius:"4px",cursor:"pointer",fontFamily:"'DM Sans',sans-serif",fontSize:"12px",marginBottom:"28px"}}>← Retour</button>
<div style={{textAlign:"center",marginBottom:"36px",paddingBottom:"24px",borderBottom:"1px solid #1a1a2e"}}>
<MoonLogo size={44}/><h1 style={{fontFamily:"'Playfair Display',serif",fontSize:"24px",color:"#D4A843",marginTop:"10px",marginBottom:"4px"}}>Le Keïsen Night</h1>
<p style={{color:"#444",fontSize:"9px",letterSpacing:"4px",marginBottom:"12px"}}>CONDITIONS GÉNÉRALES DE VENTE</p>
<p style={{color:"#2a2a3a",fontSize:"11px"}}>Version du {new Date().toLocaleDateString('fr-FR')} — Livraison nocturne 22h–6h — 91 · 94 · 77</p>
</div>
{[
{num:"01",title:"PRÉSENTATION",content:["Le Keïsen Night est un service de livraison nocturne à domicile de boissons alcoolisées, non alcoolisées et de produits d'apéritif.","📱 Téléphone / WhatsApp : 06 52 33 61 56","📧 Email : Hostilesm@gmail.com","📍 Zone : Départements 91 · 94 · 77 — Île-de-France"]},
{num:"02",title:"CHAMP D'APPLICATION",content:["Les présentes CGV s'appliquent à toutes les commandes passées via le site ou WhatsApp. Toute commande implique l'acceptation pleine et entière des présentes CGV."]},
{num:"03",title:"CONDITION D'ÂGE — VENTE D'ALCOOL",alert:"⚠️ La vente d'alcool est strictement interdite aux personnes mineures (moins de 18 ans).",content:["Tout client doit confirmer avoir 18 ans ou plus avant de commander.","Le Keïsen Night peut demander une pièce d'identité à la livraison.","En cas de doute sur l'âge, le livreur peut refuser la livraison sans remboursement.","Réf. légales : Art. L. 3342-1 et L. 3353-3 du Code de la santé publique."]},
{num:"04",title:"COMMANDES",content:["Commandes via le site ou WhatsApp au 06 52 33 61 56.","🕙 Horaires : 22h00 – 06h00, 7j/7. Toute commande hors horaires sera traitée à l'ouverture suivante.","Toute commande est ferme dès confirmation par SMS ou WhatsApp."]},
{num:"05",title:"PRIX ET PAIEMENT",content:["Prix en euros TTC. Modifiables sans préavis.","🚚 Livraison offerte dès 30 € — 4,90 € en dessous.","Minimums : Zone 1 (91) → 20 € | Zone 2 (94) → 35 € | Zone 3 (77) → 55 €","Paiement : carte bancaire (Stripe), espèces, virement sur demande."]},
{num:"06",title:"LIVRAISON",content:["Zones : 91 (Essonne), 94 (Val-de-Marne), 77 (Seine-et-Marne).","Délai estimé : 30 à 60 minutes (indicatif).","Le client doit être présent. Absence > 10 min = commande annulée sans remboursement.","Le livreur peut refuser la livraison à toute personne en état d'ivresse."]},
{num:"07",title:"DROIT DE RÉTRACTATION",content:["Conformément à l'art. L. 221-28 du Code de la consommation, le droit de rétractation ne s'applique pas aux produits périssables.","Tout litige doit être signalé dans les 24h suivant la livraison."]},
{num:"08",title:"DONNÉES PERSONNELLES (RGPD)",content:["Les données collectées sont utilisées uniquement pour traiter les commandes. Elles ne sont ni vendues ni transmises à des tiers.","Contact RGPD : Hostilesm@gmail.com"]},
{num:"09",title:"LITIGES ET DROIT APPLICABLE",content:["CGV soumises au droit français. Résolution amiable prioritaire.","Contact : Hostilesm@gmail.com · WhatsApp 06 52 33 61 56"]},
].map(article=>(
<div key={article.num} style={{marginBottom:"28px",paddingBottom:"28px",borderBottom:"1px solid #1a1a2e"}}>
<div style={{display:"flex",alignItems:"center",gap:"10px",marginBottom:"12px"}}>
<span style={{background:"rgba(212,168,67,0.1)",border:"1px solid #D4A84444",color:"#D4A843",fontSize:"10px",fontWeight:700,padding:"3px 10px",borderRadius:"6px",letterSpacing:"2px"}}>ART. {article.num}</span>
<h2 style={{fontFamily:"'Playfair Display',serif",fontSize:"15px",fontWeight:700,color:"#fff"}}>{article.title}</h2>
</div>
{article.alert&&<div style={{background:"rgba(231,76,60,0.08)",border:"1px solid #e74c3c33",borderRadius:"6px",padding:"10px 14px",marginBottom:"10px"}}><p style={{color:"#e74c3c",fontSize:"12px",fontWeight:600}}>{article.alert}</p></div>}
{article.content.map((line,i)=><p key={i} style={{color:"#666",fontSize:"12px",lineHeight:1.8,marginBottom:"4px",paddingLeft:"10px",borderLeft:"2px solid #1a1a2e"}}>{line}</p>)}
</div>
))}
<div style={{textAlign:"center",padding:"20px",background:"rgba(212,168,67,0.04)",border:"1px solid #D4A84422",borderRadius:"10px"}}>
<p style={{color:"#333",fontSize:"11px",lineHeight:2}}>L'abus d'alcool est dangereux pour la santé. À consommer avec modération.<br/>Vente interdite aux mineurs de moins de 18 ans. · © 2026 Le Keïsen Night</p>
</div>
</div>
</div>
);

// ════════════════════════════════════════════════════════════
// ADMIN
// ════════════════════════════════════════════════════════════
const LoginPage = ({onLogin}) => {
const [pw,setPw]=useState(""); const [err,setErr]=useState(""); const [shake,setShake]=useState(false);
const handle=()=>{ if(pw===ADMIN_PASSWORD){onLogin();}else{setErr("Mot de passe incorrect ❌");setShake(true);setTimeout(()=>setShake(false),500);}};
return (
<div style={{minHeight:"100vh",background:"radial-gradient(ellipse at top,#0d1a2e,#0a0a12)",display:"flex",alignItems:"center",justifyContent:"center"}}>
<div style={{background:"linear-gradient(135deg,rgba(13,26,46,0.97),rgba(10,10,18,0.98))",border:"1px solid #D4A84333",borderRadius:"12px",padding:"48px 44px",maxWidth:"380px",width:"90%",textAlign:"center",boxShadow:"0 40px 80px rgba(0,0,0,0.8)"}}>
<div style={{marginBottom:"16px",animation:"moonFloat 4s ease-in-out infinite"}}><MoonLogo size={52}/></div>
<h1 style={{fontFamily:"'Playfair Display',serif",fontSize:"20px",color:"#D4A843",marginBottom:"4px"}}>{SHOP_NAME}</h1>
<p style={{color:"#333",fontSize:"9px",letterSpacing:"4px",marginBottom:"28px"}}>ADMIN</p>
<div style={{animation:shake?"shake 0.4s ease":"none"}}>
<input type="password" value={pw} onChange={e=>setPw(e.target.value)} onKeyDown={e=>e.key==="Enter"&&handle()} placeholder="Mot de passe"
style={{width:"100%",padding:"13px",background:"#111118",border:`1px solid ${err?"#e74c3c":"#1a1a2e"}`,borderRadius:"6px",color:"#fff",fontFamily:"'DM Sans',sans-serif",fontSize:"14px",outline:"none",marginBottom:"10px",textAlign:"center",letterSpacing:"4px"}}/>
{err&&<p style={{color:"#e74c3c",fontSize:"12px",marginBottom:"10px"}}>{err}</p>}
<button onClick={handle} style={{width:"100%",background:"#D4A843",color:"#0a0a0a",border:"none",padding:"13px",borderRadius:"6px",cursor:"pointer",fontFamily:"'DM Sans',sans-serif",fontSize:"12px",fontWeight:700,letterSpacing:"2px"}}>ACCÉDER →</button>
</div>
</div>
</div>
);
};

function Admin({products:productsProp,setProducts,promos:promosProp,setPromos,orders:ordersProp,setOrders}) {
const [adminLoggedIn,setAdminLoggedIn]=useState(false);
const [tab,setTab]=useState("stats");
const [orderFilter,setOrderFilter]=useState("tous");
const [editProduct,setEditProduct]=useState(null);
const [editPromo,setEditPromo]=useState(null);
const [newPromo,setNewPromo]=useState(false);
const [selectedOrder,setSelectedOrder]=useState(null);
const [searchProduct,setSearchProduct]=useState("");
const [notification,setNotification]=useState(null);
const [newProductModal,setNewProductModal]=useState(false);
const [newProduct,setNewProduct]=useState({name:"",category:"biere",price:"",stock:"",emoji:"🍺",active:true});

const notify=(msg,type="success")=>{setNotification({msg,type});setTimeout(()=>setNotification(null),3000);};

const updateOrderStatus=(id,status)=>{setOrders(prev=>prev.map(o=>o.id===id?{...o,status}:o));notify(`Commande ${id} → ${status}`);setSelectedOrder(null);};
const saveProduct=(updated)=>{setProducts(prev=>prev.map(p=>p.id===updated.id?updated:p));setEditProduct(null);notify("Produit mis à jour ✓");};
const addProduct=()=>{
if(!newProduct.name||!newProduct.price)return;
const id=Math.max(...productsProp.map(p=>p.id))+1;
setProducts(prev=>[...prev,{...newProduct,id,price:parseFloat(newProduct.price),stock:parseInt(newProduct.stock)||0}]);
setNewProductModal(false);setNewProduct({name:"",category:"biere",price:"",stock:"",emoji:"🍺",active:true});notify("Produit ajouté ✓");
};
const toggleProduct=(id)=>{setProducts(prev=>prev.map(p=>p.id===id?{...p,active:!p.active}:p));notify("Produit mis à jour ✓");};
const savePromo=(updated)=>{
if(updated.isNew){const{isNew,...promo}=updated;setPromos(prev=>[...prev,{...promo,uses:0}]);notify("Code promo créé ✓");}
else{setPromos(prev=>prev.map(p=>p.code===updated.code?updated:p));notify("Code promo mis à jour ✓");}
setEditPromo(null);setNewPromo(false);
};
const togglePromo=(code)=>{setPromos(prev=>prev.map(p=>p.code===code?{...p,active:!p.active}:p));notify("Code promo mis à jour ✓");};
const deletePromo=(code)=>{setPromos(prev=>prev.filter(p=>p.code!==code));notify("Code supprimé","error");};

if(!adminLoggedIn) return <LoginPage onLogin={()=>setAdminLoggedIn(true)}/>;

const filteredOrders=orderFilter==="tous"?ordersProp:ordersProp.filter(o=>o.status===orderFilter);
const filteredProducts=productsProp.filter(p=>p.name.toLowerCase().includes(searchProduct.toLowerCase()));
const activeOrders=ordersProp.filter(o=>o.status==="en cours"||o.status==="en attente").length;
const lowStock=productsProp.filter(p=>p.stock<=5).length;
const totalRevenue=ordersProp.filter(o=>o.status==="livré").reduce((s,o)=>s+o.total,0);
const avgBasket=ordersProp.length?ordersProp.reduce((s,o)=>s+o.total,0)/ordersProp.length:0;

const TABS=[{id:"stats",label:"📊 Stats"},{id:"orders",label:`🌙 Commandes${activeOrders>0?` (${activeOrders})`:""}`},{id:"products",label:"📦 Produits"},{id:"promos",label:"🎁 Promos"}];

return (
<div style={{minHeight:"100vh",background:"#0a0a12",fontFamily:"'DM Sans',sans-serif",color:"#fff"}}>
{notification&&<div style={{position:"fixed",bottom:"24px",left:"50%",transform:"translateX(-50%)",zIndex:1000,background:notification.type==="error"?"#e74c3c":"#2ecc71",color:"#0a0a0a",padding:"12px 24px",borderRadius:"8px",fontSize:"13px",fontWeight:700,animation:"notif 3s ease forwards",boxShadow:"0 8px 32px rgba(0,0,0,0.4)"}}>{notification.msg}</div>}

<header style={{background:"rgba(10,10,18,0.98)",borderBottom:"1px solid #1a1a2e",padding:"0 24px",display:"flex",alignItems:"center",justifyContent:"space-between",height:"60px",position:"sticky",top:0,zIndex:100}}>
<div style={{display:"flex",alignItems:"center",gap:"10px"}}><MoonLogo size={28}/>
<div><div style={{fontFamily:"'Playfair Display',serif",fontSize:"15px",fontWeight:900,color:"#D4A843"}}>Le Keïsen Night</div><div style={{fontSize:"8px",color:"#333",letterSpacing:"3px"}}>ADMIN DASHBOARD</div></div>
</div>
<div style={{display:"flex",alignItems:"center",gap:"12px"}}>
{lowStock>0&&<div style={{background:"rgba(231,76,60,0.1)",border:"1px solid #e74c3c33",borderRadius:"6px",padding:"4px 10px"}}><span style={{color:"#e74c3c",fontSize:"11px",fontWeight:600}}>⚠️ {lowStock} stock{lowStock>1?"s":""} faible{lowStock>1?"s":""}</span></div>}
<div style={{display:"flex",alignItems:"center",gap:"6px"}}><div style={{width:"6px",height:"6px",borderRadius:"50%",background:"#2ecc71",animation:"pulse 2s infinite"}}/><span style={{fontSize:"11px",color:"#2ecc71",fontWeight:600}}>EN LIGNE</span></div>
<button onClick={()=>setAdminLoggedIn(false)} style={{background:"transparent",border:"1px solid #1a1a2e",color:"#444",padding:"6px 12px",borderRadius:"4px",cursor:"pointer",fontFamily:"'DM Sans',sans-serif",fontSize:"11px"}}>Déconnexion</button>
</div>
</header>

<div style={{background:"#0d0d1a",borderBottom:"1px solid #1a1a2e",padding:"0 24px",display:"flex",gap:"4px"}}>
{TABS.map(t=><button key={t.id} className="tab-btn" onClick={()=>setTab(t.id)} style={{background:"none",border:"none",borderBottom:`2px solid ${tab===t.id?"#D4A843":"transparent"}`,padding:"13px 16px",cursor:"pointer",fontFamily:"'DM Sans',sans-serif",fontSize:"11px",fontWeight:600,color:tab===t.id?"#D4A843":"#444",letterSpacing:"1px",transition:"color 0.2s"}}>{t.label}</button>)}
</div>

<div style={{padding:"20px 24px",maxWidth:"1200px",margin:"0 auto"}}>

{tab==="stats"&&(
<div style={{animation:"slideIn 0.3s ease"}}>
<div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))",gap:"12px",marginBottom:"20px"}}>
{[
{label:"CA livré",value:`${totalRevenue.toFixed(2)} €`,icon:"💰",color:"#D4A843",sub:"Commandes livrées"},
{label:"Commandes",value:ordersProp.length,icon:"🌙",color:"#3498db",sub:`${activeOrders} en cours`},
{label:"Panier moyen",value:`${avgBasket.toFixed(2)} €`,icon:"🛒",color:"#9b59b6",sub:"Par commande"},
{label:"Produits actifs",value:productsProp.filter(p=>p.active).length,icon:"📦",color:"#2ecc71",sub:`${lowStock} stock faible`},
].map(kpi=>(
<div key={kpi.label} style={{background:"#111118",border:"1px solid #1a1a2e",borderRadius:"10px",padding:"18px"}}>
<div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:"8px"}}>
<span style={{fontSize:"22px"}}>{kpi.icon}</span>
<span style={{fontSize:"10px",color:kpi.color,background:`${kpi.color}15`,padding:"2px 8px",borderRadius:"6px"}}>{kpi.sub}</span>
</div>
<p style={{color:"#444",fontSize:"10px",marginBottom:"4px",letterSpacing:"1px"}}>{kpi.label.toUpperCase()}</p>
<p style={{fontFamily:"'Playfair Display',serif",fontSize:"22px",fontWeight:700,color:kpi.color}}>{kpi.value}</p>
</div>
))}
</div>
<div style={{background:"#111118",border:"1px solid #1a1a2e",borderRadius:"10px",padding:"20px",marginBottom:"14px"}}>
<p style={{color:"#D4A843",fontSize:"9px",letterSpacing:"3px",marginBottom:"14px"}}>RÉPARTITION DES COMMANDES PAR STATUT</p>
<div style={{display:"flex",gap:"10px",flexWrap:"wrap"}}>
{["livré","en cours","en attente","annulé"].map(s=>{
const sc=STATUS_COLORS[s]; const count=ordersProp.filter(o=>o.status===s).length;
return <div key={s} style={{background:sc.bg,border:`1px solid ${sc.border}`,borderRadius:"8px",padding:"12px 16px",textAlign:"center",minWidth:"100px"}}>
<p style={{color:sc.color,fontSize:"20px",fontWeight:700}}>{count}</p>
<p style={{color:sc.color,fontSize:"10px",textTransform:"capitalize",marginTop:"2px"}}>{s}</p>
</div>;
})}
</div>
</div>
<div style={{background:"#111118",border:"1px solid #1a1a2e",borderRadius:"10px",padding:"20px"}}>
<p style={{color:"#D4A843",fontSize:"9px",letterSpacing:"3px",marginBottom:"14px"}}>DERNIÈRES COMMANDES</p>
{ordersProp.slice(0,4).map(o=>{
const sc=STATUS_COLORS[o.status];
return <div key={o.id} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 0",borderBottom:"1px solid #0d0d1a"}}>
<div><p style={{color:"#D4A843",fontSize:"12px",fontWeight:700}}>{o.id} — {o.client}</p><p style={{color:"#444",fontSize:"11px"}}>{o.time} · {o.zone}</p></div>
<div style={{display:"flex",alignItems:"center",gap:"10px"}}>
<span style={{background:sc.bg,color:sc.color,border:`1px solid ${sc.border}`,fontSize:"9px",fontWeight:700,padding:"2px 8px",borderRadius:"6px"}}>{o.status.toUpperCase()}</span>
<span style={{fontFamily:"'Playfair Display',serif",color:"#D4A843",fontSize:"15px",fontWeight:700}}>{o.total.toFixed(2)} €</span>
</div>
</div>;
})}
</div>
</div>
)}

{tab==="orders"&&(
<div style={{animation:"slideIn 0.3s ease"}}>
<div style={{display:"flex",gap:"8px",marginBottom:"14px",flexWrap:"wrap"}}>
{["tous","en attente","en cours","livré","annulé"].map(f=>(
<button key={f} onClick={()=>setOrderFilter(f)} style={{padding:"6px 14px",borderRadius:"16px",cursor:"pointer",background:orderFilter===f?"#D4A843":"transparent",color:orderFilter===f?"#0a0a0a":"#444",border:`1px solid ${orderFilter===f?"#D4A843":"#1a1a2e"}`,fontFamily:"'DM Sans',sans-serif",fontSize:"11px",fontWeight:600,textTransform:"capitalize",transition:"all 0.2s"}}>{f}</button>
))}
<span style={{marginLeft:"auto",color:"#444",fontSize:"12px",alignSelf:"center"}}>{filteredOrders.length} commande{filteredOrders.length>1?"s":""}</span>
</div>
<div style={{display:"flex",flexDirection:"column",gap:"10px"}}>
{filteredOrders.map(order=>{
const sc=STATUS_COLORS[order.status];
return (
<div key={order.id} className="row" onClick={()=>setSelectedOrder(order)} style={{background:"#111118",border:"1px solid #1a1a2e",borderRadius:"8px",padding:"14px",cursor:"pointer",transition:"background 0.2s"}}>
<div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",flexWrap:"wrap",gap:"8px"}}>
<div style={{display:"flex",alignItems:"center",gap:"8px"}}>
<span style={{color:"#D4A843",fontWeight:700,fontSize:"12px"}}>{order.id}</span>
<span style={{background:sc.bg,color:sc.color,border:`1px solid ${sc.border}`,fontSize:"9px",fontWeight:700,padding:"2px 8px",borderRadius:"6px"}}>{order.status.toUpperCase()}</span>
{order.promo&&<span style={{background:"rgba(155,89,182,0.1)",color:"#9b59b6",border:"1px solid #9b59b633",fontSize:"9px",padding:"2px 6px",borderRadius:"6px"}}>🎁 {order.promo}</span>}
</div>
<div style={{textAlign:"right"}}>
<span style={{fontFamily:"'Playfair Display',serif",fontSize:"17px",color:"#D4A843",fontWeight:700}}>{order.total.toFixed(2)} €</span>
<p style={{color:"#333",fontSize:"10px"}}>{order.time} · {order.date}</p>
</div>
</div>
<p style={{color:"#666",fontSize:"12px",marginTop:"8px"}}>👤 {order.client} · 📍 {order.address}</p>
<p style={{color:"#333",fontSize:"11px",marginTop:"4px"}}>{order.items.join(" · ")}</p>
</div>
);
})}
</div>
{selectedOrder&&(
<div style={{position:"fixed",inset:0,zIndex:200,background:"rgba(0,0,0,0.85)",display:"flex",alignItems:"center",justifyContent:"center",padding:"16px"}} onClick={()=>setSelectedOrder(null)}>
<div onClick={e=>e.stopPropagation()} style={{background:"#0d0d1a",border:"1px solid #1a1a2e",borderRadius:"12px",padding:"26px",maxWidth:"440px",width:"100%",animation:"slideIn 0.2s ease"}}>
<div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"18px"}}>
<h3 style={{fontFamily:"'Playfair Display',serif",fontSize:"17px",color:"#D4A843"}}>Commande {selectedOrder.id}</h3>
<button onClick={()=>setSelectedOrder(null)} style={{background:"none",border:"none",color:"#555",fontSize:"20px",cursor:"pointer"}}>×</button>
</div>
{[["Client",selectedOrder.client],["Téléphone",selectedOrder.phone],["Adresse",selectedOrder.address],["Zone",selectedOrder.zone],["Heure",`${selectedOrder.time} — ${selectedOrder.date}`]].map(([k,v])=>(
<div key={k} style={{display:"flex",justifyContent:"space-between",borderBottom:"1px solid #1a1a2e",paddingBottom:"8px",marginBottom:"8px"}}>
<span style={{color:"#444",fontSize:"12px"}}>{k}</span><span style={{color:"#ccc",fontSize:"12px",fontWeight:600}}>{v}</span>
</div>
))}
<p style={{color:"#444",fontSize:"10px",marginBottom:"6px",letterSpacing:"1px"}}>ARTICLES :</p>
{selectedOrder.items.map(item=><p key={item} style={{color:"#666",fontSize:"11px",marginBottom:"3px"}}>• {item}</p>)}
<div style={{display:"flex",justifyContent:"space-between",marginTop:"14px",paddingTop:"10px",borderTop:"1px solid #1a1a2e",marginBottom:"16px"}}>
<span style={{color:"#888"}}>Total</span>
<span style={{fontFamily:"'Playfair Display',serif",fontSize:"18px",color:"#D4A843",fontWeight:700}}>{selectedOrder.total.toFixed(2)} €</span>
</div>
<p style={{color:"#444",fontSize:"10px",letterSpacing:"2px",marginBottom:"8px"}}>CHANGER LE STATUT :</p>
<div style={{display:"flex",gap:"6px",flexWrap:"wrap"}}>
{["en attente","en cours","livré","annulé"].map(s=>{const sc=STATUS_COLORS[s];return(
<button key={s} onClick={()=>updateOrderStatus(selectedOrder.id,s)} className="btn-sm" style={{background:selectedOrder.status===s?sc.color:sc.bg,color:selectedOrder.status===s?"#0a0a0a":sc.color,border:`1px solid ${sc.border}`,padding:"6px 12px",borderRadius:"6px",cursor:"pointer",fontFamily:"'DM Sans',sans-serif",fontSize:"10px",fontWeight:700,textTransform:"capitalize",transition:"all 0.2s"}}>{s}</button>
);})}
</div>
</div>
</div>
)}
</div>
)}

{tab==="products"&&(
<div style={{animation:"slideIn 0.3s ease"}}>
<div style={{display:"flex",gap:"10px",marginBottom:"14px",flexWrap:"wrap"}}>
<input value={searchProduct} onChange={e=>setSearchProduct(e.target.value)} placeholder="🔍 Rechercher..."
style={{flex:1,minWidth:"180px",padding:"10px 14px",background:"#111118",border:"1px solid #1a1a2e",borderRadius:"6px",color:"#fff",fontFamily:"'DM Sans',sans-serif",fontSize:"12px",outline:"none"}}/>
<button onClick={()=>setNewProductModal(true)} style={{background:"#D4A843",color:"#0a0a0a",border:"none",padding:"10px 16px",borderRadius:"6px",cursor:"pointer",fontFamily:"'DM Sans',sans-serif",fontSize:"11px",fontWeight:700,letterSpacing:"1px"}}>+ NOUVEAU PRODUIT</button>
</div>
<div style={{background:"#111118",border:"1px solid #1a1a2e",borderRadius:"10px",overflow:"hidden"}}>
<div style={{display:"grid",gridTemplateColumns:"2fr 1fr 1fr 1fr 70px 70px",gap:"10px",padding:"10px 14px",borderBottom:"1px solid #1a1a2e"}}>
{["Produit","Catégorie","Prix","Stock","Statut","Action"].map(h=><span key={h} style={{color:"#333",fontSize:"9px",letterSpacing:"2px",fontWeight:600}}>{h.toUpperCase()}</span>)}
</div>
{filteredProducts.map(p=>(
<div key={p.id} className="row" style={{display:"grid",gridTemplateColumns:"2fr 1fr 1fr 1fr 70px 70px",gap:"10px",padding:"10px 14px",borderBottom:"1px solid #0d0d0d",alignItems:"center",transition:"background 0.2s"}}>
<div style={{display:"flex",alignItems:"center",gap:"8px"}}><span style={{fontSize:"16px"}}>{p.emoji}</span><span style={{color:p.active?"#ccc":"#333",fontSize:"12px"}}>{p.name}</span></div>
<span style={{color:CAT_COLORS[p.category]||"#666",fontSize:"10px",background:`${CAT_COLORS[p.category]}15`,padding:"2px 8px",borderRadius:"6px",textTransform:"capitalize"}}>{p.category}</span>
<span style={{color:"#D4A843",fontSize:"12px",fontWeight:600}}>{p.price.toFixed(2)} €</span>
<span style={{color:p.stock<=5?"#e74c3c":p.stock<=15?"#e67e22":"#2ecc71",fontSize:"12px",fontWeight:600}}>{p.stock} {p.stock<=5&&"⚠️"}</span>
<button onClick={()=>toggleProduct(p.id)} className="btn-sm" style={{background:p.active?"rgba(46,204,113,0.1)":"rgba(231,76,60,0.1)",color:p.active?"#2ecc71":"#e74c3c",border:`1px solid ${p.active?"#2ecc7133":"#e74c3c33"}`,padding:"4px 8px",borderRadius:"6px",cursor:"pointer",fontFamily:"'DM Sans',sans-serif",fontSize:"9px",fontWeight:700}}>{p.active?"ACTIF":"INACTIF"}</button>
<button onClick={()=>setEditProduct({...p})} className="btn-sm" style={{background:"rgba(212,168,67,0.1)",color:"#D4A843",border:"1px solid #D4A84333",padding:"4px 8px",borderRadius:"6px",cursor:"pointer",fontFamily:"'DM Sans',sans-serif",fontSize:"9px",fontWeight:700}}>ÉDITER</button>
</div>
))}
</div>
{editProduct&&(
<div style={{position:"fixed",inset:0,zIndex:200,background:"rgba(0,0,0,0.85)",display:"flex",alignItems:"center",justifyContent:"center",padding:"16px"}} onClick={()=>setEditProduct(null)}>
<div onClick={e=>e.stopPropagation()} style={{background:"#0d0d1a",border:"1px solid #1a1a2e",borderRadius:"12px",padding:"26px",maxWidth:"360px",width:"100%",animation:"slideIn 0.2s ease"}}>
<h3 style={{fontFamily:"'Playfair Display',serif",fontSize:"17px",color:"#D4A843",marginBottom:"18px"}}>Modifier le produit</h3>
{[{label:"Nom",key:"name",type:"text"},{label:"Prix (€)",key:"price",type:"number"},{label:"Stock",key:"stock",type:"number"},{label:"Emoji",key:"emoji",type:"text"}].map(({label,key,type})=>(
<div key={key} style={{marginBottom:"10px"}}>
<label style={{color:"#444",fontSize:"10px",letterSpacing:"1px",display:"block",marginBottom:"4px"}}>{label.toUpperCase()}</label>
<input type={type} value={editProduct[key]} onChange={e=>setEditProduct(p=>({...p,[key]:e.target.value}))}
style={{width:"100%",padding:"10px",background:"#111118",border:"1px solid #1a1a2e",borderRadius:"4px",color:"#fff",fontFamily:"'DM Sans',sans-serif",fontSize:"12px",outline:"none"}}/>
</div>
))}
<div style={{display:"flex",gap:"8px",marginTop:"16px"}}>
<button onClick={()=>saveProduct({...editProduct,price:parseFloat(editProduct.price),stock:parseInt(editProduct.stock)})} style={{flex:1,background:"#D4A843",color:"#0a0a0a",border:"none",padding:"11px",borderRadius:"6px",cursor:"pointer",fontFamily:"'DM Sans',sans-serif",fontSize:"11px",fontWeight:700}}>SAUVEGARDER</button>
<button onClick={()=>setEditProduct(null)} style={{background:"transparent",border:"1px solid #1a1a2e",color:"#444",padding:"11px 14px",borderRadius:"6px",cursor:"pointer",fontFamily:"'DM Sans',sans-serif",fontSize:"11px"}}>Annuler</button>
</div>
</div>
</div>
)}
{newProductModal&&(
<div style={{position:"fixed",inset:0,zIndex:200,background:"rgba(0,0,0,0.85)",display:"flex",alignItems:"center",justifyContent:"center",padding:"16px"}} onClick={()=>setNewProductModal(false)}>
<div onClick={e=>e.stopPropagation()} style={{background:"#0d0d1a",border:"1px solid #1a1a2e",borderRadius:"12px",padding:"26px",maxWidth:"360px",width:"100%",animation:"slideIn 0.2s ease"}}>
<h3 style={{fontFamily:"'Playfair Display',serif",fontSize:"17px",color:"#D4A843",marginBottom:"18px"}}>Nouveau produit</h3>
{[{label:"Nom",key:"name",type:"text"},{label:"Prix (€)",key:"price",type:"number"},{label:"Stock",key:"stock",type:"number"},{label:"Emoji",key:"emoji",type:"text"}].map(({label,key,type})=>(
<div key={key} style={{marginBottom:"10px"}}>
<label style={{color:"#444",fontSize:"10px",letterSpacing:"1px",display:"block",marginBottom:"4px"}}>{label.toUpperCase()}</label>
<input type={type} value={newProduct[key]} onChange={e=>setNewProduct(p=>({...p,[key]:e.target.value}))}
style={{width:"100%",padding:"10px",background:"#111118",border:"1px solid #1a1a2e",borderRadius:"4px",color:"#fff",fontFamily:"'DM Sans',sans-serif",fontSize:"12px",outline:"none"}}/>
</div>
))}
<div style={{marginBottom:"14px"}}>
<label style={{color:"#444",fontSize:"10px",letterSpacing:"1px",display:"block",marginBottom:"4px"}}>CATÉGORIE</label>
<select value={newProduct.category} onChange={e=>setNewProduct(p=>({...p,category:e.target.value}))}
style={{width:"100%",padding:"10px",background:"#111118",border:"1px solid #1a1a2e",borderRadius:"4px",color:"#fff",fontFamily:"'DM Sans',sans-serif",fontSize:"12px",outline:"none"}}>
{["biere","alcool","champagne","vin","apero","soft","accessoire"].map(c=><option key={c} value={c}>{c}</option>)}
</select>
</div>
<div style={{display:"flex",gap:"8px"}}>
<button onClick={addProduct} style={{flex:1,background:"#D4A843",color:"#0a0a0a",border:"none",padding:"11px",borderRadius:"6px",cursor:"pointer",fontFamily:"'DM Sans',sans-serif",fontSize:"11px",fontWeight:700}}>AJOUTER</button>
<button onClick={()=>setNewProductModal(false)} style={{background:"transparent",border:"1px solid #1a1a2e",color:"#444",padding:"11px 14px",borderRadius:"6px",cursor:"pointer",fontFamily:"'DM Sans',sans-serif",fontSize:"11px"}}>Annuler</button>
</div>
</div>
</div>
)}
</div>
)}

{tab==="promos"&&(
<div style={{animation:"slideIn 0.3s ease"}}>
<div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"14px",flexWrap:"wrap",gap:"10px"}}>
<p style={{color:"#444",fontSize:"12px"}}>{promosProp.length} codes · {promosProp.filter(p=>p.active).length} actifs</p>
<button onClick={()=>{setEditPromo({code:"",type:"percent",discount:10,minOrder:20,maxUses:50,active:true,expires:"31/12/2026",isNew:true});setNewPromo(true);}}
style={{background:"#D4A843",color:"#0a0a0a",border:"none",padding:"9px 16px",borderRadius:"6px",cursor:"pointer",fontFamily:"'DM Sans',sans-serif",fontSize:"11px",fontWeight:700,letterSpacing:"1px"}}>+ NOUVEAU CODE</button>
</div>
<div style={{display:"flex",flexDirection:"column",gap:"10px"}}>
{promosProp.map(promo=>(
<div key={promo.code} style={{background:"#111118",border:`1px solid ${promo.active?"#1a1a2e":"#0d0d0d"}`,borderRadius:"10px",padding:"16px",opacity:promo.active?1:0.5}}>
<div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",flexWrap:"wrap",gap:"10px"}}>
<div style={{display:"flex",alignItems:"center",gap:"12px"}}>
<span style={{background:"rgba(212,168,67,0.12)",border:"1px solid #D4A84444",color:"#D4A843",fontSize:"13px",fontWeight:700,padding:"4px 12px",borderRadius:"6px",letterSpacing:"2px"}}>{promo.code}</span>
<div>
<p style={{color:"#ccc",fontSize:"13px",fontWeight:600}}>{promo.type==="percent"?`−${promo.discount}%`:`−${promo.discount} €`} <span style={{color:"#444",fontSize:"11px",fontWeight:400}}>dès {promo.minOrder} €</span></p>
<p style={{color:"#333",fontSize:"11px"}}>Expire le {promo.expires}</p>
</div>
</div>
<div style={{display:"flex",gap:"10px",alignItems:"center"}}>
<div style={{textAlign:"center"}}>
<p style={{color:"#D4A843",fontSize:"16px",fontWeight:700}}>{promo.uses}</p>
<p style={{color:"#333",fontSize:"9px"}}>/ {promo.maxUses} utilisations</p>
</div>
<div style={{width:"38px",height:"38px",borderRadius:"50%",background:"#0d0d1a",display:"flex",alignItems:"center",justifyContent:"center",position:"relative"}}>
<svg viewBox="0 0 36 36" width="38" height="38" style={{position:"absolute",top:0,left:0,transform:"rotate(-90deg)"}}>
<circle cx="18" cy="18" r="15" fill="none" stroke="#1a1a2e" strokeWidth="3"/>
<circle cx="18" cy="18" r="15" fill="none" stroke="#D4A843" strokeWidth="3" strokeDasharray={`${(promo.uses/promo.maxUses)*94} 94`} strokeLinecap="round"/>
</svg>
<span style={{color:"#D4A843",fontSize:"8px",fontWeight:700,position:"relative",zIndex:1}}>{Math.round((promo.uses/promo.maxUses)*100)}%</span>
</div>
</div>
</div>
<div style={{display:"flex",gap:"8px",marginTop:"12px"}}>
<button onClick={()=>setEditPromo({...promo})} className="btn-sm" style={{background:"rgba(212,168,67,0.08)",color:"#D4A843",border:"1px solid #D4A84333",padding:"5px 12px",borderRadius:"6px",cursor:"pointer",fontFamily:"'DM Sans',sans-serif",fontSize:"10px",fontWeight:700}}>ÉDITER</button>
<button onClick={()=>togglePromo(promo.code)} className="btn-sm" style={{background:promo.active?"rgba(231,76,60,0.08)":"rgba(46,204,113,0.08)",color:promo.active?"#e74c3c":"#2ecc71",border:`1px solid ${promo.active?"#e74c3c33":"#2ecc7133"}`,padding:"5px 12px",borderRadius:"6px",cursor:"pointer",fontFamily:"'DM Sans',sans-serif",fontSize:"10px",fontWeight:700}}>{promo.active?"DÉSACTIVER":"ACTIVER"}</button>
<button onClick={()=>deletePromo(promo.code)} className="btn-sm" style={{background:"rgba(231,76,60,0.05)",color:"#e74c3c44",border:"1px solid #e74c3c22",padding:"5px 12px",borderRadius:"6px",cursor:"pointer",fontFamily:"'DM Sans',sans-serif",fontSize:"10px",fontWeight:700}}>SUPPRIMER</button>
</div>
</div>
))}
</div>
{editPromo&&(
<div style={{position:"fixed",inset:0,zIndex:200,background:"rgba(0,0,0,0.85)",display:"flex",alignItems:"center",justifyContent:"center",padding:"16px"}} onClick={()=>{setEditPromo(null);setNewPromo(false);}}>
<div onClick={e=>e.stopPropagation()} style={{background:"#0d0d1a",border:"1px solid #1a1a2e",borderRadius:"12px",padding:"26px",maxWidth:"360px",width:"100%",animation:"slideIn 0.2s ease"}}>
<h3 style={{fontFamily:"'Playfair Display',serif",fontSize:"17px",color:"#D4A843",marginBottom:"18px"}}>{newPromo?"Nouveau code promo":"Modifier le code"}</h3>
{[{label:"Code promo",key:"code",type:"text"},{label:"Réduction",key:"discount",type:"number"},{label:"Commande minimum (€)",key:"minOrder",type:"number"},{label:"Max utilisations",key:"maxUses",type:"number"},{label:"Expiration (JJ/MM/AAAA)",key:"expires",type:"text"}].map(({label,key,type})=>(
<div key={key} style={{marginBottom:"10px"}}>
<label style={{color:"#444",fontSize:"10px",letterSpacing:"1px",display:"block",marginBottom:"4px"}}>{label.toUpperCase()}</label>
<input type={type} value={editPromo[key]} onChange={e=>setEditPromo(p=>({...p,[key]:e.target.value}))}
style={{width:"100%",padding:"10px",background:"#111118",border:"1px solid #1a1a2e",borderRadius:"4px",color:"#fff",fontFamily:"'DM Sans',sans-serif",fontSize:"12px",outline:"none",textTransform:key==="code"?"uppercase":"none"}}/>
</div>
))}
<div style={{marginBottom:"14px"}}>
<label style={{color:"#444",fontSize:"10px",letterSpacing:"1px",display:"block",marginBottom:"6px"}}>TYPE DE RÉDUCTION</label>
<div style={{display:"flex",gap:"8px"}}>
{[{val:"percent",label:"Pourcentage %"},{val:"fixed",label:"Montant fixe €"}].map(({val,label})=>(
<button key={val} onClick={()=>setEditPromo(p=>({...p,type:val}))} style={{flex:1,padding:"8px",borderRadius:"6px",cursor:"pointer",background:editPromo.type===val?"#D4A843":"transparent",color:editPromo.type===val?"#0a0a0a":"#444",border:`1px solid ${editPromo.type===val?"#D4A843":"#1a1a2e"}`,fontFamily:"'DM Sans',sans-serif",fontSize:"11px",fontWeight:600}}>{label}</button>
))}
</div>
</div>
<div style={{display:"flex",gap:"8px"}}>
<button onClick={()=>savePromo({...editPromo,discount:parseFloat(editPromo.discount),minOrder:parseFloat(editPromo.minOrder),maxUses:parseInt(editPromo.maxUses)})}
style={{flex:1,background:"#D4A843",color:"#0a0a0a",border:"none",padding:"11px",borderRadius:"6px",cursor:"pointer",fontFamily:"'DM Sans',sans-serif",fontSize:"11px",fontWeight:700}}>
{newPromo?"CRÉER":"SAUVEGARDER"}
</button>
<button onClick={()=>{setEditPromo(null);setNewPromo(false);}} style={{background:"transparent",border:"1px solid #1a1a2e",color:"#444",padding:"11px 14px",borderRadius:"6px",cursor:"pointer",fontFamily:"'DM Sans',sans-serif",fontSize:"11px"}}>Annuler</button>
</div>
</div>
</div>
)}
</div>
)}
</div>
</div>
);
}

// ════════════════════════════════════════════════════════════
// ROOT — Routeur principal
// ════════════════════════════════════════════════════════════
export default function Root() {
// État partagé entre boutique et admin
const [ageConfirmed, setAgeConfirmed] = useState(false);
const [products, setProducts] = useState(ALL_PRODUCTS);
const [promos, setPromos] = useState(INIT_PROMOS);
const [orders, setOrders] = useState(INIT_ORDERS);

// Détection du mode admin : ?admin dans l'URL
const isAdmin = typeof window !== "undefined" && window.location.search.includes("admin");

const handleNewOrder = (order) => {
setOrders(prev => [order, ...prev]);
};

return (
<>
<style>{GLOBAL_CSS}</style>
{isAdmin ? (
<Admin
products={products}
setProducts={setProducts}
promos={promos}
setPromos={setPromos}
orders={orders}
setOrders={setOrders}
/>
) : !ageConfirmed ? (
<AgeGate onConfirm={() => setAgeConfirmed(true)} />
) : (
<Shop
products={products}
promos={promos}
orders={orders}
onNewOrder={handleNewOrder}
/>
)}
</>
);
}
