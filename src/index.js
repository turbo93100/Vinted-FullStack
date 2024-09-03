const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(
  "sk_test_51PuxWKGmHoMbwktlKmx6J48MtaeQIHVJSOCf6Jfb82MyoyV3TqeiKBXCw2YQ2ywiaDgj9jchZIdd9ofF5KkV58S200LLmlmiMj"
);

const app = express();
app.use(cors());
app.use(express.json());

app.post("/payment", async (req, res) => {
  try {
    // on va créer une intention de paiement en précisant des infos obligatoires
    // 8)
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 590, // montant de la transaction (envoyé par le body !)
      currency: "eur", // la devise de la transaction
      description: "item vendu par Lucas promo Orion 24", // description du produit
    });

    // on renvoie cette intention de paiement à notre front !
    res.json(paymentIntent);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

app.listen(4000, () => {
  console.log("server started on port 4000");
});
