## `creditcard`

A simple class for identifying, validating, and formatting credit card information.

```python
from creditcard import CreditCard

card = CreditCard('375371850275506',
                  expire_month='03',
                  expire_year='2017',
                  code=2887,
                  cardholder='Charles Smith')

if card.is_valid:

    print(card.brand)         # American Express
    print(card.cardholder)    # Charles Smith
    print(card.number)        # 3753 718502 75506
    print('Expires: {} ({})'  # Expires: 03/17 (2017-03-01)
          .format(card.expires_string, card.expires))
    print('{}: {}'            # CID: 2887
          .format(card.code_name, card.code))
    if card.is_expired:
        print('EXPIRED')      # EXPIRED

```

### Supported Card Families

**Note:** pull requests for [new cards](creditcard/data/registry.xml) are welcome!

 * Visa
 * American Expiress
 * Mastercard
 * Discover
 * Diners Club
 * UnionPay (China)
 * JCB (Japan Credit Beauro)
