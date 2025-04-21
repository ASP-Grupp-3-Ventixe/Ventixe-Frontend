## 🚀 Live Preview (Officiell deployment):👉 ***https://ambitious-tree-05976ac03.6.azurestaticapps.net***
---


---
## 🚀 Deployment

Varje push till `main` branch deployas automatiskt till Azure Static Web Apps.

---
### 🧪 Kom igång lokalt
```bash
git clone https://github.com/ASP-Grupp-3-Ventixe/Ventixe-Frontend.git
cd Ventixe-Frontend
npm install
npm run dev
```
### 🌿 Arbeta med egna delsystem
```bash
# 2. Skapa en ny branch för din feature:
git checkout -b bookings-frontend

# 3. När du är klar:
# Testa lokalt
git push origin bookings-frontend
# Skapa en Pull Request till main
```
---
## 📚 Branch Naming Policy

För att hålla strukturen tydlig och professionell, gäller följande branch-namnstandard i både frontend- och backend-repositorierna.

---

### 🖥️ Frontend-branches:

```bash
auth-frontend
booking-frontend
event-frontend
admin-frontend
```
### 🗄️ Backend-branches:
```
auth-backend
booking-backend
event-backend
admin-backend
```
### 🧪 Exempel
```bash
# Skapa en ny branch för att jobba med autentisering i frontend
git checkout -b auth-frontend

# Efter färdigutveckling:
git push origin auth-frontend
# Gå till GitHub och skapa en Pull Request till main
```

---
## 🌐 Delsystem & Azure-länkar

 Här samlar vi alla publicerade backend-länkar så att vi lätt hittar till varandras API:er och kan testa systemet som helhet.

## 🛠️ Backend-länkar (Azure App Services)

> Dessa används av frontend för att fetcha data.  
> T.ex. om du bygger Dashboard och vill visa bokningar, behöver du BookingsBackend-URL:en.
> > Lägg in din länk när du har deployat.

```bash
┌───────────────┬──────────────────────┬──────────────────────────────────────────────────────────────┐
│ Namn          │ Delsystem            │ Azure-länk                                                   │
├───────────────┼──────────────────────┼──────────────────────────────────────────────────────────────┤
│ [Fyll i namn] │ AuthBackend          │ [klistra in din länk här]                                    │
│ [Fyll i namn] │ BookingsBackend      │ [klistra in din länk här]                                    │
│ [Fyll i namn] │ EventsBackend        │ [klistra in din länk här]                                    │
│ [Fyll i namn] │ AdminBackend         │ [klistra in din länk här]                                    │
└───────────────┴──────────────────────┴──────────────────────────────────────────────────────────────┘


```
## 🌐 Frontend-länkar (Azure Static Web Apps)

> Här samlar vi alla publicerade frontend-länkar.  
> Dessa visar hur varje delsystems användargränssnitt ser ut live.  
> Lägg in din länk när du har deployat.

```
┌───────────────┬──────────────────────┬──────────────────────────────────────────────────────────────┐
│ Namn          │ Delsystem            │ Azure-länk                                                   │
├───────────────┼──────────────────────┼──────────────────────────────────────────────────────────────┤
│ [Fyll i namn] │ Ventixe Frontend     │ [klistra in din länk här]                                    │
│ [Fyll i namn] │ BookingsFrontend     │ [klistra in din länk här]                                    │
│ [Fyll i namn] │ DashboardFrontend    │ [klistra in din länk här]                                    │
│ [Fyll i namn] │ AdminFrontend        │ [klistra in din länk här]                                    │
└───────────────┴──────────────────────┴──────────────────────────────────────────────────────────────┘

