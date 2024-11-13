const express = require('express');
const openpgp = require('openpgp');
const path = require('path');
const fs = require('fs');

const app = express();
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

const PUBKEY = path.join(__dirname, 'src', 'pgp', 'publickey.asc');

const routes = ['/', '/about', '/contact', '/status', '/design', '/projects', '/cloud'];
routes.forEach(route => {
    app.get(route, (req, res) => {
        res.render(route === '/' ? 'index' : route.slice(1), { req });
    });
});

app.get('/verify', (req, res) => {
    res.render('verify', { req, verifyResult: null });
});

app.post('/verify', async (req, res) => {
    const { pgpMessage } = req.body;

    try {
        const pubKeyArmored = fs.readFileSync(PUBKEY, 'utf8');
        const pubKey = await openpgp.readKey({ armoredKey: pubKeyArmored });

        const cleartextMessage = await openpgp.readCleartextMessage({ cleartextMessage: pgpMessage });

        const verifyResult = await openpgp.verify({
            message: cleartextMessage,
            verificationKeys: pubKey,
        });

        const isValid = await verifyResult.signatures[0].verified;
        let resultMessage;

        if (isValid) {
            resultMessage = '✅ Signature is valid!';
        } else {
            resultMessage = '❌ Signature is invalid or message has been tampered with.';
        }

        res.render('verify', { req, verifyResult: resultMessage });

    } catch (error) {
        if (error.message.includes("Could not find signing key")) {
            console.error('Verification failed: Unknown/invalid signing key');
            res.render('verify', { req, verifyResult: '❌ Signature is from unknown signer or invalid.' });
        } else {
            console.error('Verification failed:', error);
            res.render('verify', { req, verifyResult: '❌ An error occurred during verification.' });
        }
    }
});

const PORT = process.env.PORT || 5566;
app.listen(PORT, () => {
    const now = new Date();
    const fT = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;
    console.log(`Running at: ${fT}`);
    console.log(`Server running on http://localhost:${PORT}`);
});
