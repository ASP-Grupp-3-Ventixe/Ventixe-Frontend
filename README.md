## 🚀 Live Preview (Officiell deployment):👉 ***https://ambitious-tree-05976ac03.6.azurestaticapps.net***
---


---
## 🚀 Deployment

Varje push till `main` branch deployas automatiskt till Azure Static Web Apps.

---
## 🧪 Kom igång lokalt
```bash
git clone https://github.com/ASP-Grupp-3-Ventixe/Ventixe-Frontend.git
cd Ventixe-Frontend
npm install
npm run dev
```
## 🌿 Arbeta med egna delsystem
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


