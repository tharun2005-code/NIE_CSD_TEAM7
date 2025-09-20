# NIE_CSD_TEAM7
SDP September 2025 Ecommerce website collaborator

stuff that was told to be added:
```txt
DATABASE:

1. Members (id, name, balance, phone)

2. Recharges (id, name(FK), price, description)

3\. Games(id, name, price, description)
Extras => duration, status(active/inactive), min\_player\_count, max\_player\_count, player\_count\_multiple

4 Transactions (id, member\_id(FK), game\_id(FK), amount, date)

```

## The collections:

1. members
    ```bash
    db.createCollection("members", {
        validator: {
            $jsonSchema: {
            bsonType: "object",
            required: ["name", "phone"],
            properties: {
                name: { bsonType: "string" },
                balance: { bsonType: "double" },
                phone: { bsonType: "string" }
            }
            }
        }
    });
    ```
2. games
    ```bash
        db.createCollection("games", {
        validator: {
            $jsonSchema: {
            bsonType: "object",
            required: ["name", "price", "duration", "status", "min_player_count", "max_player_count", "player_count_multiple"],
            properties: {
                name: { bsonType: "string" },
                price: { bsonType: "double" },
                description: { bsonType: "string" },
                
                duration: { bsonType: "int" },  // or "double" if fractional allowed
                status: { enum: ["active", "inactive"] }, // restrict to these values
                min_player_count: { bsonType: "int" },
                max_player_count: { bsonType: "int" },
                player_count_multiple: { bsonType: "int" }
                }
            }
            }
        });
    ```

3. recharges
    ```bash 
    db.createCollection("recharges", {
        validator: {
            $jsonSchema: {
            bsonType: "object",
            required: ["memberId", "amount"],
            properties: {
                memberId: { bsonType: "objectId" },
                amount: { bsonType: "double" },
                dateTime: { bsonType: "date" }
            }
            }
        }
    });
    ```
4. transactions
    ```bash
    db.createCollection("transactions", {
        validator: {
            $jsonSchema: {
            bsonType: "object",
            required: ["memberId", "gameId", "amount"],
            properties: {
                memberId: { bsonType: "objectId" },
                gameId: { bsonType: "objectId" },
                amount: { bsonType: "double" },
                dateTime: { bsonType: "date" }
            }
            }
        }
    });
    ```
5. collections
    ```bash
    db.createCollection("collections", {
        validator: {
            $jsonSchema: {
            bsonType: "object",
            required: ["date", "amount"],
            properties: {
                date: { bsonType: "date" },
                amount: { bsonType: "double" }
            }
            }
        }
    });
    ```
6. admin_users
    ```bash
    db.createCollection("admin_users", {
        validator: {
            $jsonSchema: {
            bsonType: "object",
            required: ["username", "password"],
            properties: {
                username: { bsonType: "string" },
                password: { bsonType: "string" }
            }
            }
        }
    });
    ```