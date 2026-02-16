import tkinter as tk
from tkinter import messagebox
import json
import os

ACCOUNTS_FILE = "accounts.json"


def load_accounts():
    if os.path.exists(ACCOUNTS_FILE):
        with open(ACCOUNTS_FILE, "r") as f:
            return json.load(f)
    return {}


def save_accounts(accounts):
    with open(ACCOUNTS_FILE, "w") as f:
        json.dump(accounts, f)


def authenticate():
    username = entry_username.get()
    password = entry_password.get()
    accounts = load_accounts()

    if username in accounts and accounts[username] == password:
        messagebox.showinfo("Login Successful", f"Welcome {username} to agpAIso 2.0!")
    else:
        messagebox.showerror("Login Failed", "Invalid Username or Password")


def create_account():
    new_username = entry_new_username.get()
    new_password = entry_new_password.get()
    confirm_password = entry_confirm_password.get()
    accounts = load_accounts()

    if new_username == "" or new_password == "":
        messagebox.showerror("Error", "All fields are required!")
    elif new_password != confirm_password:
        messagebox.showerror("Error", "Passwords do not match!")
    elif new_username in accounts:
        messagebox.showerror("Error", "Username already exists!")
    else:
        accounts[new_username] = new_password
        save_accounts(accounts)
        messagebox.showinfo("Account Created", f"Account for {new_username} created successfully!\nYou can now log in.")
        create_win.destroy()


def open_create_account():
    global create_win
    create_win = tk.Toplevel(root)
    create_win.title("Create Account")
    create_win.geometry("400x300")
    create_win.configure(bg="#F3F4F6")

    lbl_title = tk.Label(create_win, text="🆕 Create Account", font=("Times New Romans", 18, "bold"), bg="#F3F4F6", fg="#30ACBE")
    lbl_title.pack(pady=10)

    frame_create = tk.Frame(create_win, bg="white", bd=2, relief="groove")
    frame_create.pack(pady=20, padx=20)

    lbl_new_username = tk.Label(frame_create, text="New Username / Student ID", font=("monsteratt", 10), bg="white")
    lbl_new_username.grid(row=0, column=0, padx=10, pady=10, sticky="w")
    global entry_new_username
    entry_new_username = tk.Entry(frame_create, width=30)
    entry_new_username.grid(row=0, column=1, padx=10, pady=10)

    lbl_new_password = tk.Label(frame_create, text="Password", font=("monsteratt", 10), bg="white")
    lbl_new_password.grid(row=1, column=0, padx=10, pady=10, sticky="w")
    global entry_new_password
    entry_new_password = tk.Entry(frame_create, width=30, show="*")
    entry_new_password.grid(row=1, column=1, padx=10, pady=10)

    lbl_confirm_password = tk.Label(frame_create, text="Confirm Password", font=("monsteratt", 10), bg="white")
    lbl_confirm_password.grid(row=2, column=0, padx=10, pady=10, sticky="w")
    global entry_confirm_password
    entry_confirm_password = tk.Entry(frame_create, width=30, show="*")
    entry_confirm_password.grid(row=2, column=1, padx=10, pady=10)

    btn_create = tk.Button(frame_create, text="CREATE ACCOUNT", width=20, bg="#10B981", fg="white", command=create_account)
    btn_create.grid(row=3, column=0, columnspan=2, pady=15)


root = tk.Tk()
root.title("agpAIso - Fake News Detection 2.0")
root.geometry("400x300")
root.configure(bg="#F3F4F6")

lbl_title = tk.Label(root, text="🔒 agpAIso", font=("Times New Romans", 20, "bold"), bg="#F3F4F6", fg="#1E3A8A")
lbl_title.pack(pady=10)

lbl_subtitle = tk.Label(root, text="AI Fake News Detection for CCIS Students 2.0", font=("Roboto", 10), bg="#F3F4F6", fg="#10B981")
lbl_subtitle.pack(pady=5)

frame_login = tk.Frame(root, bg="white", bd=2, relief="groove")
frame_login.pack(pady=20, padx=20)

lbl_username = tk.Label(frame_login, text="Username / Student ID", font=("Roboto", 10), bg="white")
lbl_username.grid(row=0, column=0, padx=10, pady=10, sticky="w")
entry_username = tk.Entry(frame_login, width=30)
entry_username.grid(row=0, column=1, padx=10, pady=10)

lbl_password = tk.Label(frame_login, text="Password", font=("Roboto", 10), bg="white")
lbl_password.grid(row=1, column=0, padx=10, pady=10, sticky="w")
entry_password = tk.Entry(frame_login, width=30, show="*")
entry_password.grid(row=1, column=1, padx=10, pady=10)


remember_var = tk.IntVar()
chk_remember = tk.Checkbutton(frame_login, text="Remember me", variable=remember_var, bg="white")
chk_remember.grid(row=2, column=0, columnspan=2, pady=5)


btn_login = tk.Button(frame_login, text="LOGIN", width=20, bg="#1E3A8A", fg="white", command=authenticate)
btn_login.grid(row=3, column=0, columnspan=2, pady=15)


btn_create_account = tk.Button(frame_login, text="CREATE ACCOUNT", width=20, bg="#10B981", fg="white", command=open_create_account)
btn_create_account.grid(row=4, column=0, columnspan=2, pady=5)


lbl_footer = tk.Label(root, text="About | Privacy Policy | Help Desk\n© CCIS Students 2.0", font=("Roboto", 8), bg="#F3F4F6", fg="gray")
lbl_footer.pack(side="bottom", pady=10)

root.mainloop()
