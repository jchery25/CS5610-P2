# Script for populating the database. You can run it as:
#
#     mix run priv/repo/seeds.exs
#
# Inside the script, you can read and write to any of your
# repositories directly:
#
#     Collegechef.Repo.insert!(%Collegechef.SomeSchema{})
#
# We recommend using the bang functions (`insert!`, `update!`
# and so on) as they will fail if something goes wrong.
alias Collegechef.Repo
alias Collegechef.Recipes.Recipe
alias Collegechef.Users.User


pw = Argon2.hash_pwd_salt("password12345")

alice = Repo.insert!(%User{name: "Alice", email: "alice@example.com", password_hash: pw})
Repo.insert!(%Recipe{cuisine: "Beverage", name: "Coffee", diet: "Vegeterian", duration: 20, description: "Heat milk. Add suagr. Add coffee powder and stir. Coffee is ready.", likes: 2, dislikes: 0, ingredients: "Milk, Sugar, Coffee powder", user_id: alice.id })
Repo.insert!(%Recipe{cuisine: "Beverage", name: "Tea", diet: "Vegeterian", duration: 20, description: "Heat water. Add sugar and tea powder.Boil. Add milk. Tea is ready.", likes: 2, dislikes: 0, ingredients: "Tea, Milk, Sugar", user_id: alice.id })
Repo.insert!(%Recipe{cuisine: "Italian", name: "Pasta", diet: "Vegeterian", duration: 20, description: "Heat Pan. Add oil. Add tomatoes. Add onions. Boil pasta", likes: 2, dislikes: 0, ingredients: "Tomatoes, Onions, Sugar, Pasta", user_id: alice.id })
