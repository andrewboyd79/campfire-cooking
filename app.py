import os
from flask import (
    Flask, render_template, url_for, redirect, flash, request, session)
from flask_pymongo import PyMongo
from werkzeug.security import generate_password_hash, check_password_hash
if os.path.exists("env.py"):
    import env


app = Flask(__name__)

app.config["MONGO_DBNAME"] = os.environ.get("MONGO_DBNAME")
app.config["MONGO_URI"] = os.environ.get("MONGO_URI")
app.secret_key = os.environ.get("SECRET_KEY")

mongo = PyMongo(app)


@app.route("/")
@app.route("/recipes")
def recipes():
    recipes = list(mongo.db.recipes.find())
    return render_template("recipes.html", recipes=recipes)


@app.route("/add_recipes", methods=["GET", "POST"])
def add_recipes():
    difficulty = list(mongo.db.difficulty.find())
    time_unit = list(mongo.db.time_units.find())
    
    if request.method == "POST":
        preparation = request.form.getlist("prep_time")
        prep_time = ' '.join(preparation)
        cooking = request.form.getlist("cook_time")
        cook_time = ' '.join(cooking)
        ingredients = request.form.getlist("ingredients")
        
        
        recipe = {
            "recipe_name": request.form.get("recipe_name"),
            "recipe_summary": request.form.get("recipe_summary"),
            "serves": request.form.get("serves"),
            "prep_time": prep_time,
            "cook_time": cook_time,
            "difficulty": request.form.get("difficulty"),
            "ingredients": ingredients,
            "image_url": request.form.get("image_url"),
            "method": request.form.getlist("method"),
            "added_by": session["user"]
        }
        mongo.db.recipes.insert_one(recipe)
        flash("Recipe successfully added")
        return redirect(url_for("add_recipes"))

    return render_template("add_recipes.html", difficulty=difficulty,
     time_unit=time_unit)


@app.route("/register", methods=["GET", "POST"])
def register():
    if request.method == "POST":
        # check for existing username using .findone method
        existing_user = mongo.db.users.find_one(
            {"username": request.form.get("username").lower()}
        )

        # returns flash message if user exists and resets page
        if existing_user:
            flash("This username already exists \
            - please select a new username")
            return redirect(url_for("register"))

        # register if user down't exist
        register = {
            "username": request.form.get("username").lower(),
            "password": generate_password_hash(request.form.get("password")),
            "forename": request.form.get("forename").lower(),
            "surname": request.form.get("surname").lower()
        }
        mongo.db.users.insert_one(register)

        # puts new user into session
        session["user"] = request.form.get("username").lower()
        flash("Thank you for registering with Campfire Cooking!")
    return render_template("register.html")


@app.route("/login", methods=["GET", "POST"])
def login():
    if request.method == "POST":
        # check if username exists in db
        existing_user = mongo.db.users.find_one(
            {"username": request.form.get("username").lower()})

        if existing_user:
            # ensure hashed password matches user input
            if check_password_hash(
                    existing_user["password"], request.form.get("password")):
                session["user"] = request.form.get("username").lower()
                flash("Welcome, {}".format(request.form.get("username")))
                return redirect(
                    url_for("recipes", username=session["user"]))
            else:
                # invalid password match
                flash("Incorrect Username and/or Password")
                return redirect(url_for("login"))

        else:
            # username doesn't exist
            flash("Incorrect Username and/or Password")
            return redirect(url_for("login"))

    return render_template("login.html")


@app.route("/logout")
def logout():
    flash ("Thank you for using Campfire Cooking!")
    session.pop("user")
    return redirect(url_for('login'))

if __name__ == "__main__":
    app.run(host=os.environ.get("IP"),
            port=int(os.environ.get("PORT")),
            debug=True)  # REMOVE PRIOR TO SUBMISSION
