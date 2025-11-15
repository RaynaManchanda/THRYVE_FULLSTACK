// ===============================
// USER PROFILE + PROGRESS SYSTEM
// ===============================

// Class to represent a user's basic details
class UserProfile {
  constructor(name, email, age) {
    this.name = name;
    this.email = email;
    this.age = age;
  }

  // Update user profile values
  updateProfile(name, email, age) {
    this.name = name;
    this.email = email;
    this.age = age;

    alert(`Profile Updated:\nName: ${this.name}\nEmail: ${this.email}\nAge: ${this.age}`);
  }
}

// Inherits from UserProfile and adds progress tracking
class ProgressTracker extends UserProfile {
  constructor(name, email, age, progress = 0) {
    super(name, email, age);
    this.progress = progress;
  }

  // Increase progress by 10%, max 100%
  increaseProgress() {
    if (this.progress < 100) {
      this.progress += 10;
      const el = document.getElementById("progressText");
      if (el) el.innerText = `Progress: ${this.progress}%`;
    } else {
      alert("You already reached 100% progress!");
    }
  }
}

// Create a default user object
const user = new ProgressTracker("Guest", "guest@example.com", 0);

// ========== SAVE PROFILE BUTTON ==========
const saveBtn = document.getElementById("saveProfile");
if (saveBtn) {
  saveBtn.addEventListener("click", () => {
    const name = document.getElementById("name")?.value || "";
    const email = document.getElementById("email")?.value || "";
    const age = document.getElementById("age")?.value || "";

    user.updateProfile(name, email, age);
  });
}

// ========== INCREASE PROGRESS BUTTON ==========
const progressBtn = document.getElementById("increaseProgress");
if (progressBtn) {
  progressBtn.addEventListener("click", () => {
    user.increaseProgress();
  });
}
