## 🚀 Live Preview (Netlify) (Officiell deployment):👉 ***https://ventixe-cave.netlify.app/***
## 🚀 Live Preview (Azure SWA) (Officiell deployment):👉 ***https://kind-coast-0cff2bc03.6.azurestaticapps.net*** 
---


---
## 🚀 Deployment

Varje push till `main` branch deployas automatiskt till netlify live länken.

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

## 🔧 Backend-länkar (Azure App Services)

Här samlar vi alla publicerade backend-länkar så att vi lätt hittar till varandras API:er och kan testa systemet som helhet.

Dessa används av frontend för att fetcha data.  
T.ex. om du bygger Dashboard och vill visa bokningar, behöver du BookingsBackend-URL:en.

> 🔁 Lägg in din länk när du har deployat ditt backend!

```bash
| Namn          | Delsystem        | API-länk                                | GitHub-repo-länk                                |
|---------------|------------------|--------------------------------------------|--------------------------------------------------|
| [Daniel Nweze] |TokenServiceProvider|[https://tokenserviceprovider.onrender.com/ValidateToken]|[https://github.com/Daniel-Nweze/TokenServiceProvider.git]|
| [Daniel Nweze] |TokenServiceProvider|[https://tokenserviceprovider.onrender.com/Auth/token]| [https://github.com/Daniel-Nweze/TokenServiceProvider.git]|
| [Kaspar Johansson] | AuthServiceProvider    | [kappeauthserviceprovider-avevcya4hrd2ahb2.swedencentral-01.azurewebsites.net]            | [https://github.com/ASP-Grupp-3-Ventixe/AuthServiceProviderVentixe]                 |
| [Kaspar Johansson] | AccountServiceProvider     | [kappeaccountserviceprovider-fpc6habrbpckg8ha.swedencentral-01.azurewebsites.net]            | [https://github.com/ASP-Grupp-3-Ventixe/AccountServiceProvider]                 |



```
## 🌐 Frontend-länkar (Azure Static Web Apps)
 Här samlar vi alla publicerade frontend-länkar.  
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

