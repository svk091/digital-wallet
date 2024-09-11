import express from "express";
import db from "@repo/db/jsclient";
import prisma from "@repo/db/jsclient";
const app = express();

app.use(express.json())
app.get("/", (req, res) => {
  res.json({
    msg: "hi there"
  })
})

app.get("/getUser", async (req, res) => {
  const user = await db.user.findFirst({
    where: {
      id: req.body.id
    }
  })
  return res.json({
    user
  })
})

enum OnRampStatus {
  Success,
  Failure,
  Processing
}
app.post("/hdfcWebhook", async (req, res) => {
  //TODO: Add zod validation here?
  //TODO: HDFC bank should ideally send us a secret so we know this is sent by them
  const current_status = await prisma.onRampTransaction.findFirst({
    where: {
      token: req.body.token
    },
    select: {
      status: true
    }
  })
  if (!current_status || !(current_status.status === "Processing")) {
    return res.json({
      message: "Transaction completed"
    })
  }
  const paymentInformation: {
    token: string;
    userId: string;
    amount: string
  } = {
    token: req.body.token,
    userId: req.body.user_identifier,
    amount: req.body.amount
  };

  try {
    await db.$transaction([
      db.balance.updateMany({
        where: {
          userId: Number(paymentInformation.userId)
        },
        data: {
          amount: {
            // You can also get this from your DB
            increment: Number(paymentInformation.amount)
          }
        }
      }),
      db.onRampTransaction.updateMany({
        where: {
          token: paymentInformation.token
        },
        data: {
          status: "Success",
        }
      })
    ]);

    res.json({
      message: "Captured"
    })
  } catch (e) {
    console.error(e);
    res.status(411).json({
      message: "Error while processing webhook"
    })
  }

})

const PORT = process.env.PORT || 3003;
app.listen(3003, () => console.log(`server running at http://localhost:${PORT}`))