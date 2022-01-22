export type Fruitbasket = {
  "version": "0.1.0",
  "name": "fruitbasket",
  "instructions": [
    {
      "name": "initializeGroup",
      "accounts": [
        {
          "name": "owner",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "fruitBasketGrp",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "cache",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "quoteTokenMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "quoteTokenTransactionPool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "bumpGroup",
          "type": "u8"
        },
        {
          "name": "bumpCache",
          "type": "u8"
        },
        {
          "name": "baseMintName",
          "type": "string"
        }
      ]
    },
    {
      "name": "addToken",
      "accounts": [
        {
          "name": "owner",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "fruitBasketGrp",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "priceOracle",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "productOracle",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenPool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "market",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "openOrdersAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "fruitbasketAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "dexProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "name",
          "type": "string"
        }
      ]
    },
    {
      "name": "addBasket",
      "accounts": [
        {
          "name": "client",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "group",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "basket",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "basketMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "basketNumber",
          "type": "u8"
        },
        {
          "name": "basketBump",
          "type": "u8"
        },
        {
          "name": "basketMintBump",
          "type": "u8"
        },
        {
          "name": "basketName",
          "type": "string"
        },
        {
          "name": "basketDesc",
          "type": "string"
        },
        {
          "name": "basketComponents",
          "type": {
            "vec": {
              "defined": "BasketComponentDescription"
            }
          }
        }
      ]
    },
    {
      "name": "updatePrice",
      "accounts": [
        {
          "name": "group",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "cache",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "oracleAi",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "updateBasketPrice",
      "accounts": [
        {
          "name": "basket",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "cache",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "initTradeContext",
      "accounts": [
        {
          "name": "group",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "basket",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "cache",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "quoteTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "basketTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "quoteTokenMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "basketTokenMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tradeContext",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "quoteTokenTransactionPool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "fruitBasketAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "orderId",
          "type": "u8"
        },
        {
          "name": "contextBump",
          "type": "u8"
        },
        {
          "name": "side",
          "type": {
            "defined": "ContextSide"
          }
        },
        {
          "name": "amount",
          "type": "u64"
        },
        {
          "name": "maxBuyOrMinSellPrice",
          "type": "u64"
        }
      ]
    },
    {
      "name": "processTokenForContext",
      "accounts": [
        {
          "name": "fruitbasketGroup",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tradeContext",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "quoteTokenMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "basketTokenMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "fruitbasket",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "market",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "openOrders",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "requestQueue",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "eventQueue",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "bids",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "asks",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "quoteTokenVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "vaultSigner",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenPool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "quoteTokenTransactionPool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "fruitBasketAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "dexProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "finalizeContext",
      "accounts": [
        {
          "name": "fruitbasketGroup",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tradeContext",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "fruitbasket",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "quoteTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "basketTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "quoteTokenTransactionPool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "fruitBasketAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "quoteTokenMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "basketTokenMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "user",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    }
  ],
  "accounts": [
    {
      "name": "fruitBasketGroup",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "owner",
            "type": "publicKey"
          },
          {
            "name": "tokenCount",
            "type": "u8"
          },
          {
            "name": "baseMint",
            "type": "publicKey"
          },
          {
            "name": "baseMintName",
            "type": {
              "array": [
                "u8",
                10
              ]
            }
          },
          {
            "name": "numberOfBaskets",
            "type": "u8"
          },
          {
            "name": "nbUsers",
            "type": "u8"
          },
          {
            "name": "tokenDescription",
            "type": {
              "array": [
                {
                  "defined": "TokenDescription"
                },
                20
              ]
            }
          },
          {
            "name": "quoteTokenTransactionPool",
            "type": "publicKey"
          }
        ]
      }
    },
    {
      "name": "basket",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "basketName",
            "type": {
              "array": [
                "u8",
                128
              ]
            }
          },
          {
            "name": "desc",
            "type": {
              "array": [
                "u8",
                256
              ]
            }
          },
          {
            "name": "numberOfComponents",
            "type": "u8"
          },
          {
            "name": "components",
            "type": {
              "array": [
                {
                  "defined": "BasketComponentDescription"
                },
                10
              ]
            }
          },
          {
            "name": "basketMint",
            "type": "publicKey"
          },
          {
            "name": "lastPrice",
            "type": "u64"
          },
          {
            "name": "confidence",
            "type": "u64"
          },
          {
            "name": "decimal",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "cache",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "lastPrice",
            "type": {
              "array": [
                "u64",
                20
              ]
            }
          },
          {
            "name": "lastExp",
            "type": {
              "array": [
                "i32",
                20
              ]
            }
          },
          {
            "name": "lastConfidence",
            "type": {
              "array": [
                "u64",
                20
              ]
            }
          }
        ]
      }
    },
    {
      "name": "basketTradeContext",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "side",
            "type": {
              "defined": "ContextSide"
            }
          },
          {
            "name": "basket",
            "type": "publicKey"
          },
          {
            "name": "reverting",
            "type": "u8"
          },
          {
            "name": "amount",
            "type": "u64"
          },
          {
            "name": "usdcAmountLeft",
            "type": "u64"
          },
          {
            "name": "quoteTokenAccount",
            "type": "publicKey"
          },
          {
            "name": "basketTokenAccount",
            "type": "publicKey"
          },
          {
            "name": "initialUsdcTransferAmount",
            "type": "u64"
          },
          {
            "name": "createdOn",
            "type": "u64"
          },
          {
            "name": "tokenAmounts",
            "type": {
              "array": [
                "u64",
                20
              ]
            }
          },
          {
            "name": "tokensTreated",
            "type": {
              "array": [
                "u8",
                20
              ]
            }
          }
        ]
      }
    }
  ],
  "types": [
    {
      "name": "TokenDescription",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "tokenMint",
            "type": "publicKey"
          },
          {
            "name": "priceOracle",
            "type": "publicKey"
          },
          {
            "name": "productOracle",
            "type": "publicKey"
          },
          {
            "name": "tokenName",
            "type": {
              "array": [
                "u8",
                10
              ]
            }
          },
          {
            "name": "tokenPool",
            "type": "publicKey"
          },
          {
            "name": "tokenDecimal",
            "type": "u8"
          },
          {
            "name": "tokenOpenOrders",
            "type": "publicKey"
          },
          {
            "name": "market",
            "type": "publicKey"
          }
        ]
      }
    },
    {
      "name": "BasketComponentDescription",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "tokenIndex",
            "type": "u8"
          },
          {
            "name": "amount",
            "type": "u64"
          },
          {
            "name": "decimal",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "ContextSide",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "Buy"
          },
          {
            "name": "Sell"
          }
        ]
      }
    }
  ]
};

export const IDL: Fruitbasket = {
  "version": "0.1.0",
  "name": "fruitbasket",
  "instructions": [
    {
      "name": "initializeGroup",
      "accounts": [
        {
          "name": "owner",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "fruitBasketGrp",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "cache",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "quoteTokenMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "quoteTokenTransactionPool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "bumpGroup",
          "type": "u8"
        },
        {
          "name": "bumpCache",
          "type": "u8"
        },
        {
          "name": "baseMintName",
          "type": "string"
        }
      ]
    },
    {
      "name": "addToken",
      "accounts": [
        {
          "name": "owner",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "fruitBasketGrp",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "priceOracle",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "productOracle",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenPool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "market",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "openOrdersAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "fruitbasketAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "dexProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "name",
          "type": "string"
        }
      ]
    },
    {
      "name": "addBasket",
      "accounts": [
        {
          "name": "client",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "group",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "basket",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "basketMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "basketNumber",
          "type": "u8"
        },
        {
          "name": "basketBump",
          "type": "u8"
        },
        {
          "name": "basketMintBump",
          "type": "u8"
        },
        {
          "name": "basketName",
          "type": "string"
        },
        {
          "name": "basketDesc",
          "type": "string"
        },
        {
          "name": "basketComponents",
          "type": {
            "vec": {
              "defined": "BasketComponentDescription"
            }
          }
        }
      ]
    },
    {
      "name": "updatePrice",
      "accounts": [
        {
          "name": "group",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "cache",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "oracleAi",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "updateBasketPrice",
      "accounts": [
        {
          "name": "basket",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "cache",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "initTradeContext",
      "accounts": [
        {
          "name": "group",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "basket",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "cache",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "quoteTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "basketTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "quoteTokenMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "basketTokenMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tradeContext",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "quoteTokenTransactionPool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "fruitBasketAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "orderId",
          "type": "u8"
        },
        {
          "name": "contextBump",
          "type": "u8"
        },
        {
          "name": "side",
          "type": {
            "defined": "ContextSide"
          }
        },
        {
          "name": "amount",
          "type": "u64"
        },
        {
          "name": "maxBuyOrMinSellPrice",
          "type": "u64"
        }
      ]
    },
    {
      "name": "processTokenForContext",
      "accounts": [
        {
          "name": "fruitbasketGroup",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tradeContext",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "quoteTokenMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "basketTokenMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "fruitbasket",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "market",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "openOrders",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "requestQueue",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "eventQueue",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "bids",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "asks",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "quoteTokenVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "vaultSigner",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenPool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "quoteTokenTransactionPool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "fruitBasketAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "dexProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "finalizeContext",
      "accounts": [
        {
          "name": "fruitbasketGroup",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tradeContext",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "fruitbasket",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "quoteTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "basketTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "quoteTokenTransactionPool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "fruitBasketAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "quoteTokenMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "basketTokenMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "user",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    }
  ],
  "accounts": [
    {
      "name": "fruitBasketGroup",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "owner",
            "type": "publicKey"
          },
          {
            "name": "tokenCount",
            "type": "u8"
          },
          {
            "name": "baseMint",
            "type": "publicKey"
          },
          {
            "name": "baseMintName",
            "type": {
              "array": [
                "u8",
                10
              ]
            }
          },
          {
            "name": "numberOfBaskets",
            "type": "u8"
          },
          {
            "name": "nbUsers",
            "type": "u8"
          },
          {
            "name": "tokenDescription",
            "type": {
              "array": [
                {
                  "defined": "TokenDescription"
                },
                20
              ]
            }
          },
          {
            "name": "quoteTokenTransactionPool",
            "type": "publicKey"
          }
        ]
      }
    },
    {
      "name": "basket",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "basketName",
            "type": {
              "array": [
                "u8",
                128
              ]
            }
          },
          {
            "name": "desc",
            "type": {
              "array": [
                "u8",
                256
              ]
            }
          },
          {
            "name": "numberOfComponents",
            "type": "u8"
          },
          {
            "name": "components",
            "type": {
              "array": [
                {
                  "defined": "BasketComponentDescription"
                },
                10
              ]
            }
          },
          {
            "name": "basketMint",
            "type": "publicKey"
          },
          {
            "name": "lastPrice",
            "type": "u64"
          },
          {
            "name": "confidence",
            "type": "u64"
          },
          {
            "name": "decimal",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "cache",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "lastPrice",
            "type": {
              "array": [
                "u64",
                20
              ]
            }
          },
          {
            "name": "lastExp",
            "type": {
              "array": [
                "i32",
                20
              ]
            }
          },
          {
            "name": "lastConfidence",
            "type": {
              "array": [
                "u64",
                20
              ]
            }
          }
        ]
      }
    },
    {
      "name": "basketTradeContext",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "side",
            "type": {
              "defined": "ContextSide"
            }
          },
          {
            "name": "basket",
            "type": "publicKey"
          },
          {
            "name": "reverting",
            "type": "u8"
          },
          {
            "name": "amount",
            "type": "u64"
          },
          {
            "name": "usdcAmountLeft",
            "type": "u64"
          },
          {
            "name": "quoteTokenAccount",
            "type": "publicKey"
          },
          {
            "name": "basketTokenAccount",
            "type": "publicKey"
          },
          {
            "name": "initialUsdcTransferAmount",
            "type": "u64"
          },
          {
            "name": "createdOn",
            "type": "u64"
          },
          {
            "name": "tokenAmounts",
            "type": {
              "array": [
                "u64",
                20
              ]
            }
          },
          {
            "name": "tokensTreated",
            "type": {
              "array": [
                "u8",
                20
              ]
            }
          }
        ]
      }
    }
  ],
  "types": [
    {
      "name": "TokenDescription",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "tokenMint",
            "type": "publicKey"
          },
          {
            "name": "priceOracle",
            "type": "publicKey"
          },
          {
            "name": "productOracle",
            "type": "publicKey"
          },
          {
            "name": "tokenName",
            "type": {
              "array": [
                "u8",
                10
              ]
            }
          },
          {
            "name": "tokenPool",
            "type": "publicKey"
          },
          {
            "name": "tokenDecimal",
            "type": "u8"
          },
          {
            "name": "tokenOpenOrders",
            "type": "publicKey"
          },
          {
            "name": "market",
            "type": "publicKey"
          }
        ]
      }
    },
    {
      "name": "BasketComponentDescription",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "tokenIndex",
            "type": "u8"
          },
          {
            "name": "amount",
            "type": "u64"
          },
          {
            "name": "decimal",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "ContextSide",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "Buy"
          },
          {
            "name": "Sell"
          }
        ]
      }
    }
  ]
};
