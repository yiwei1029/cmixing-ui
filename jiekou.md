1. **Balance Status**![](C:\Users\Administrator\AppData\Roaming\marktext\images\2024-06-26-22-38-30-image.png)

```
{
    Available: 0.77,
    Occupied: 0.23
}
```

2. **Add and Remove Budget![](C:\Users\Administrator\AppData\Roaming\marktext\images\2024-06-26-22-40-24-image.png)**

3. **Privacy Using Pct**![](C:\Users\Administrator\AppData\Roaming\marktext\images\2024-06-26-22-42-45-image.png)

```
{
    range1:0.13,
    range2:0.29,
    range3:0.48,
    range4:0.1,
}
```

4. Requests, Transactions and Revenue![](C:\Users\Administrator\AppData\Roaming\marktext\images\2024-06-27-00-23-02-image.png)
   
   ```
   IndicatorByTime: {
                   Request: [{ time: '10:50', value: 20 }, { time: '10:51', value: 40 }, { time: '10:52', value: 60 }],
                   Transaction: [{ time: '10:50', value: 10 }, { time: '10:51', value: 15 }, { time: '10:52', value: 20 }],
                   Revenue: [{ time: '10:50', value: 10 }, { time: '10:51', value: 22 }, { time: '10:52', value: 30 }]
               }
   ```

5. Statistics![](C:\Users\Administrator\AppData\Roaming\marktext\images\2024-06-27-00-23-32-image.png)

```
Stats: [
                { title: 'Today Active User', value: 1572 },
                { title: 'Today Revenue', value: 37362 },
                { title: 'Today Requests', value: 4179 },
                { title: 'Today Transactions', value: 732 }
            ]
```

6. Add a Input ![](C:\Users\Administrator\AppData\Roaming\marktext\images\2024-06-27-00-24-55-image.png)![](C:\Users\Administrator\AppData\Roaming\marktext\images\2024-06-27-00-25-05-image.png)

7. Add a output![](C:\Users\Administrator\AppData\Roaming\marktext\images\2024-06-27-00-25-47-image.png)![](C:\Users\Administrator\AppData\Roaming\marktext\images\2024-06-27-00-25-57-image.png)

8. Send request and Transaction
   
   ![](C:\Users\Administrator\AppData\Roaming\marktext\images\2024-06-27-00-26-27-image.png)

9. select a transaction and display its info![](C:\Users\Administrator\AppData\Roaming\marktext\images\2024-06-27-00-27-57-image.png)![](C:\Users\Administrator\AppData\Roaming\marktext\images\2024-06-27-00-28-07-image.png)
   
   9.1 Input and Output![](C:\Users\Administrator\AppData\Roaming\marktext\images\2024-06-27-00-28-36-image.png)
   
   ```
   InputList: [
                  { hash: 'bc1quqfl65xqtkprhrygpdpeg4r7q20zyaq8xvxd3a', amount: 20 },
                  { hash: 'bc1qnalwjznls42dzvaw4m5u48td032692aslqwg9m', amount: 7 },
                  { hash: 'bc1q5t94hycpjv2uegcchfr7q30tsuhq8wd2u90cg4', amount: 3 },
                  // { hash: 'bc1qm4ztr7257hlqk3x670zr6maz36qnehczuetqrn', amount: 0.00428200 }
   
              ],
              OutputList: [
                  { hash: 'bc1qnalwjznls42dzvaw4m5u48td032692aslqwg9m', amount: 7 },
                  { hash: 'bc1qm4ztr7257hlqk3x670zr6maz36qnehczuetqrn', amount: 7 },
                  { hash: 'bc1qwt9n2akyfesvgrh6ppct5wtvfq44xj48a8xq7c', amount: 3 },
                  { hash: 'bc1q7us0u59m2v2taggyydwaw2zfyl8psgjnzssk07', amount: 3 },
                  { hash: 'bc1q35td3t5yldmx6tcllf5jvq8y6yan3ymc9709pt', amount: 7 },
                  { hash: 'bc1qu2mfpjszwgalh8dfjjua3w6ssn8cl6dquq5ru7', amount: 3 }]
   ```
   
   9.2 block info
   
   ![](C:\Users\Administrator\AppData\Roaming\marktext\images\2024-06-27-22-22-11-image.png)
   
   9.3 The number of outputs
   
   ![](C:\Users\Administrator\AppData\Roaming\marktext\images\2024-06-27-22-22-45-image.png)
   
   ```
   OutputStats: [
    { OutputAmount: 7, Stats: 3 },
    { OutputAmount: 3, Stats: 3 },
   ]
   ```
   
   9.4 Calculate the prob
   
   ![](C:\Users\Administrator\AppData\Roaming\marktext\images\2024-06-27-22-23-12-image.png)

       input address and output address=>prob
