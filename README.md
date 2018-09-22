# Envie um E-mail de um formulário HTML *Estático* usando o Google Apps Mail!

Um ***exemplo passo a passo*** de como usar um **Formulário HTML** para enviar uma mensagem do tipo "Fale Conosco" por e-mail sem um servidor back-end usando um script do Google - sem PHP, Python, Ruby, Java, Node.js etc.

Em vez de usar um servidor para enviar seu e-mail, o que é *fácil*, mas exige *manutenção*, 
use o Google para enviar e-mails em seu nome e use o Google Spreadsheets para acompanhar os dados!

DEMONSTRAÇÃO: https://doni7brandao.github.io/email_via_google/

**_Observação:_** a API do Google tem limites sobre quantos e-mails podem ser enviados por dia. Isso pode variar em sua conta do Google, veja [os limites aqui](https://developers.google.com/apps-script/guides/services/quotas).
Recomendamos implementar este tutorial na Parte 3, pois os dados sempre serão adicionados à planilha primeiro e, em seguida, se tiver tudo certo, enviados por e-mail.

## Por quê?

Porque queremos enviar um e-mail a partir de uma Página HTML "*estática*" quando você (*não quer*) ou *não tem* um *servidor*.

### *Principais Vantagens*

+ Nenhum "*Backend*" para implantar/manter/ou pagar
+ ***Totalmente customizável*** - cada aspecto é personalizável!
+ E-mail *enviado por meio do* ***Gmail***, que tem ***alta performance de fornecimento***
+ Você pode **Recolher/Guardar** quaisquer **dados do formulário** em uma ***planilha*** para facilitar a visualização  
(*perfeito se você precisa compartilhá-lo com pessoas não-técnicas*)

## *Como*?

### 1. Faça uma cópia da planilha de amostra

> Exemplo: https://docs.google.com/spreadsheets/d/1Uvy4hmHj3lh4bXatxLV6FUC9HRlXKjOlYGR3Iwdr-Ps/copy

Faça login na sua conta do Google e clique em "**Fazer uma cópia**..."

![1-make-copy](https://user-images.githubusercontent.com/1406149/29245471-feb7b034-7f97-11e7-9c0d-f06238e8362b.png)

Isso deve lhe dar algo assim:

![2-copy-of-sheet](https://cloud.githubusercontent.com/assets/194400/10559710/3aec92f0-74ef-11e5-9295-f1988a23257b.png)

> Note: Feel free to change the name of the Copy to anything you want,
it will not affect the outcome.

### 2. Abra o Editor de Script

Abra o **Editor de Script...** clicando em "**Ferramentas**" > "**Editor de Script...**"

![2 script-editor](https://cloud.githubusercontent.com/assets/194400/10559732/8db2b9f6-74ef-11e5-8bf2-de286f079929.png)

Aqui está um *modelo limpo* (*sem comentários*) do script que você precisa : [google-script-just-email.js](https://raw.githubusercontent.com/dwyl/learn-to-send-email-via-google-script-html-no-server/1d1c6727f69dec64a6b7f6bd6ff0dd72d0374210/google-script-just-email.js)

### 3. Defina o `TO_ADDRESS` no script

**_Observação:_** Se você não descomentar e definir seu e-mail como o valor de
`TO_ADDRESS`, é possível que alguém que tenha habilidades na web altere seu 
formulário e envie dados por e-mail para um endereço de e-mail arbitrário.

Descomente o código da variável `TO_ADDRESS` e defina esse valor como igual 
ao email que deve receber os dados do formulário quando enviado.

![3-script-editor-showing-script](https://cloud.githubusercontent.com/assets/194400/10560379/9efa5b3a-7501-11e5-96ba-a9e3b2d77ee4.png)

### 4. Salve uma *Nova Versão* do seu script

Parece muito *óbvio* mas após *Salvar* você tem que *clicar* em "*Gerenciar Versões...*"

![19 google-script-no-save-new-version](https://cloud.githubusercontent.com/assets/194400/10558249/527f3c98-74c1-11e5-8290-5af7fa7f5f75.png)

Em seguida *crie* sua nova versão:

![20 google-script-save-new-version](https://cloud.githubusercontent.com/assets/194400/10558250/53d21d5e-74c1-11e5-88c5-7bc2d8ce6228.png)

### 5. Publicar o script *atualizado* como um App da Web

![20 a-publish](https://cloud.githubusercontent.com/assets/194400/10558288/50980aa8-74c2-11e5-8576-72084a564779.png)

Selecione a versão *mais recente* do projeto para implantar.  
:warning: Observação: Você *deve* selecionar a opção `Anyone, even anonymous` na lista suspensa 'quem tem acesso ao App' ou as respostas ao formulário não serão adicionadas à planilha! :warning:

![21 deploy-new-version](https://cloud.githubusercontent.com/assets/194400/10558251/570a5428-74c1-11e5-8ced-5dd26d3de3c4.png)

### 6. Autorize o script para enviar e-mails

![5 auth-required](https://cloud.githubusercontent.com/assets/194400/10560412/89d3fb0c-7502-11e5-81ce-fb239bf545b2.png)

A menos que você [verify your script with Google](https://developers.google.com/apps-script/guides/client-verification#requesting_verification), será necessário clicar em "Avançado" e "Ir para... (inseguro)" para conceder permissões a este aplicativo.

![5-auth-failed-verification](https://user-images.githubusercontent.com/1406149/44312495-79583780-a3b6-11e8-9740-8c9b50f195d6.png)

![5-allow-sending-emails](https://cloud.githubusercontent.com/assets/194400/10560416/a86a26ae-7502-11e5-9add-d5081d409af4.png)

Copie o URL do aplicativo da web para sua placa de recados / bloco de notas. Em seguida, clique em "OK".

![22 1-deploy-as-web-app](https://cloud.githubusercontent.com/assets/194400/10558255/6eec31e2-74c1-11e5-9c07-cea6209526df.png)

### 7. Crie o seu formulário HTML *básico*

Usando o template `index.html` neste repo, crie seu próprio arquivo html com o formulário básico. (*salve o arquivo*)

:warning: Se você prefere usar *o seu próprio formulário* nesta etapa, em vez de usar o exemplo neste repo:
+ Cada um dos seus elementos de formulário deve ter um atributo `Nome` igual ao nome de sua coluna na planilha do Google
+ Os formulários `class` deve ser `gform`, ou seja `<form class="gform">`
+ Se você quiser alterar isso mais tarde, você precisará criar sua própria versão de `script-google-apps.js` e alterar o esperado `class`


> Lembre-se de alterar a URL do `action` para o formulário que você copiou na etapa anterior:

![7-html-form](https://user-images.githubusercontent.com/1406149/44312329-9b9c8600-a3b3-11e8-9816-4bdbbc96dc62.png)


### 8. Abra o formulário HTML (*página*) no seu navegador

Preencha alguns dados de amostra no formulário HTML:

![html form](https://cloud.githubusercontent.com/assets/194400/10560494/674b64c4-7504-11e5-801a-b537d276f671.png)

Envie o formulário. Você deve ver assim uma confirmação de que foi enviada:
![form sent](https://cloud.githubusercontent.com/assets/194400/10560501/8f605dd4-7504-11e5-8cd7-06d768beba4d.png)

### 9. Verifique a caixa de entrada do email para o endereço que você definiu

Abra a caixa de entrada para o endereço de e-mail que você definiu na **Etapa 3** (*acima*)

![email received](https://cloud.githubusercontent.com/assets/194400/10560512/f87f1652-7504-11e5-8b0f-c342c395a193.png)


> ***Pronto!!!***. É isso aí. Você acabou de criar um formulário HTML que envia e-mail!

# *Parte dois - customizar para deixa-lo bonitinho*...

Vamos manter ele assim, usando um estilo ***Super Limpo*** usando o [**PURE CSS**](http://purecss.io/start/)
f (*corrija o formulário HTML "simples" criado na Etapa 8*).

Corrija o `submit` do formulário usando [**JQuery** "***AJAX***"](http://api.jquery.com/jquery.ajax/) para a resposta a sua mensagem (*mantendo assim a pessoa na sua página!*)

### 10. Submit the Form using **JavaScript** "***AJAX***"

To *prevent* the page from changing to the `JSON` response/result
we need to submit the form using ***AJAX***.

Download [the following Javascript file](form-submission-handler.js) and update your `index.html` to point to it at the *end* of your file
(*before the closing `</body>` tag)

```html
<script data-cfasync="false" type="text/javascript" src="form-submission-handler.js"></script>
```

**Warning:** If you did not set the `TO_ADDRESS` variable in Step 3, then
you need to include a `data-email="example@email.net"` attribute inside the
main form element. See the example form for more details. Otherwise, if you did
set this variable, then you do not need this form attribute.

This will now display a "Thank You" *message* when the form is submitted:

![thankyou message](https://cloud.githubusercontent.com/assets/194400/10561147/4086a89a-7517-11e5-840d-7f490353e225.png)

Keeps the person on the same page. No refresh.

### 11. Customise the  Message Shown when Form Submitted

Taylor your message by editing the `thankyou_message` div:

![10-customise-the-thankyou-message](https://cloud.githubusercontent.com/assets/194400/10561213/9e6d3342-7518-11e5-9860-43a268102de2.png)


### 12. Use CSS to Make the Form *Look Good*

For `this` *example* we are using ***Pure CSS***: http://purecss.io/start/
because its ***light weight*** (***4.0KB minified and gzipped***)
and *solves* our current "*problem*": Making it Look Good.

![PureCSS-Logo-Intro](https://github-cloud.s3.amazonaws.com/assets/194400/10565838/72d6d52a-75d2-11e5-9b92-ca02b1124920.png)

![PureCSS-module-sizes](https://github-cloud.s3.amazonaws.com/assets/194400/10565844/8f4885a0-75d2-11e5-9490-e3fc42c32616.png)

Without spending *too much* time on this, we can make the form *look*
***a lot*** nicer:

![contact form with pure css](https://github-cloud.s3.amazonaws.com/assets/194400/10566392/f38bc454-75dd-11e5-85dd-6819494a98f2.png)

### 13. Make the email look good too!

By default, the sent email's body contains the key-value pairs from the form, with the key as an `<h4>` and the value as a `<div>`. This is a fairly basic, and foolproof view for the data.

You should get something that looks roughly like:
![Nicely formatted email](https://cloud.githubusercontent.com/assets/5610747/22168070/335ad734-df62-11e6-9523-6e193e94151f.png)

> Bear in mind that this is a work in progress and does potentially open you up to getting more than you bargained for in the email. Because the email content is now looping over all the data sent in the form, if a robot or malicious user decides to `POST` more than you've asked for, you'll likely get it in your inbox. Use with caution for now. We're investigating improvements.

You can modify this though, via the script editor. The line:

```javascript
result += "<h4 style='text-transform: capitalize; margin-bottom: 0'>" + key + "</h4><div>" + obj[key] + "</div>";
```

has all you need. You can adjust the markup to suit you. We chose an `<h4>` because it was the best size for the email, and added the small amount of CSS to it to fix the capitalisation (the keys are all lower case in the JS object) and a bit of default spacing. While inline styles like this are generally bad practice on normal web pages, for email HTML they're about the only reliable way to do CSS!  
We went with a `<div>` for the value part, because it could be anything - single-line, multiline (a `<p>` for example wouldn't cut it).

While we're here, there's also a `replyTo` option for the `sendEmail()` method which is commented out by default:

```javascript
MailApp.sendEmail({
  to: TO_ADDRESS,
  subject: "Contact form submitted",
  // replyTo: String(mailData.email), // This is optional and reliant on your form actually collecting a field named `email`
  htmlBody: formatMailBody(mailData)
});
```

You can uncomment that if you want to add a reply-to field to your email. The example in the script will set the reply-to as the email submitted in the form.

Google's documentation provides more information about MailApp.sendEmail (for example `cc`/`bcc` etc.) if you're interested:
https://developers.google.com/apps-script/reference/mail/mail-app

# *Part Three - Store Submitted Contact Form Data in a Spreadsheet*

Sending the form data directly to your email inbox is a *good*
first step, but we can do better. Also, as noted above, Google
has limits on how many emails you can send in a day, so storing
the data into a spreadsheet is safer and less prone to data loss.

### 14. Add the `record_data` Function to your Google Apps Script

![record_data example](https://cloud.githubusercontent.com/assets/194400/10581613/8b4f9ad4-767b-11e5-90cc-962a9d6acc91.png)

This will record the data received from the `POST` as a *row* in the spreadsheet.  
See: [**google-apps-script.js**](google-apps-script.js) for the full code you can *copy-paste*.

### 15. Save a New Version and Re-Publish it

Follow Steps 4, 5 & 6 to save a new version and ***re-publish*** the script.

### 16. Re-Test Submitting the Form

![submit the form](https://cloud.githubusercontent.com/assets/194400/10582654/cf3081e6-7680-11e5-9fd1-b989a8ba0b65.png)

### 17 Confirm the Data was Inserted into the Spreadsheet

![17-confirm-data-inserted](https://cloud.githubusercontent.com/assets/194400/10582676/eb8af5d8-7680-11e5-92bb-30dd08d2d7b3.png)


### _Live_ Server (_on your `localhost`_)

Because we are loading external **.js** files, our web browser
will not _allow_ us to simply open the **index.html** from a
local directory for testing out the form.

Open your terminal and run this command
to _**install** the **node modules** and **start** the **live server**_:

```sh
npm install live-server --save-dev && node_modules/.bin/live-server --port=8000
```

It will take a minute to install,
but once that's done your `live-server` will start up.

That starts a node.js HTTP server on port 8000
and opens the form you just created in your default browser.
If you wish to update the form styles in **style.css** or the
client-side Javascript in **form-submission-handler.js**,
please be sure to edit **index.html** to load those resources
locally rather than via GitHub.

> **Note**: This is a _light_ taste of Node.js for absolute beginners.
You do **not** need node.js to "deploy" this form,
you can run it on an **_any_ web server** that serves HTML/CSS/JavaScript.
If you have never used Node.js before, see: http://nodeguide.com/beginner.html
but for the purposes of this exercise (_submitting a form **without** a server_)
you _don't **need**_ node.js or `live-server`
it's just a _nice_ thing to have when you are creating
your form because it automatically re-loads the page when you make changes in your text editor!


# *Want more*?

If you want us to take this tutorial further, [***please let us know***!](https://github.com/dwyl/learn-to-send-email-via-google-script-html-no-server/issues)

For your convenience, we have hosted a working demo of the field on GitHub
Pages, check it out to see the code and how it works:
https://dwyl.github.io/learn-to-send-email-via-google-script-html-no-server/


## Add your own fields!

In response to [Henry Beary's request](https://github.com/dwyl/learn-to-send-email-via-google-script-html-no-server/issues/9)
we made the form handler *generic* which means you can now add any fields you want to the form.

We also created a form, `test.html`, which uses all kinds of form input elements
so you can just copy and paste elements as desired into your own form. Just be
sure to update their names and IDs. You can find a working example of this test
form here:
https://dwyl.github.io/learn-to-send-email-via-google-script-html-no-server/test.html

Remember to include the fields *inside* the form that has the class `gform`
and ensure that the `name` of the form element matches the new column heading in your spreadsheet.
e.g:
```HTML
<fieldset class="pure-group">
  <label for="color">Favourite Color: </label>
  <input id="color" name="color" placeholder="green" />
</fieldset>
```
This will allow you to capture the person's favourite color:
e.g:
![new-field-contains-data](https://cloud.githubusercontent.com/assets/194400/11547132/9f162f6a-9949-11e5-89ac-aeb91e025844.png)

Let us know if you have any questions!

## SPAM prevention

In order to avoid getting spammed and fill up google apps usage quota, we will be implementing a simple SPAM prevention technique that's known as Honeypot where it essentially creates a hidden text field that if filled up is assumed as a spam bot and prevents the form from submit.

```html
<form action="https://script.google.com/macros/s/..." method="post">
  <!--input id must be honeypot or else it wont work-->
  <label class="sr-only">Keep this field blank</label>
  <input id="honeypot" type="text" name="honeypot" value="" />
  <!--the rest of your form-->
</form>
```

```css
#honeypot {
  display: none; /*makes the field not visible to humans*/
}
```

```javascript
/* form-submission-handler.js */
/* remove the comment from this if statement */

if (validateHuman(data.honeypot)) {  //if form is filled, form will not be submitted
  return false;
}

```


## Uploading Files

[This resource](https://www.labnol.org/internet/receive-files-in-google-drive/19697/) may help you get started on uploading files to Google Drive from the Google Script.


## Frequently Asked Questions (FAQ's)

1. _How can I get help using this tutorial?_

- Feel free to [post an issue](https://github.com/dwyl/learn-to-send-email-via-google-script-html-no-server/issues/new) describing in detail which steps you have gone through and what isn't working. To get a helpful response, please provide a [working example](https://stackoverflow.com/help/mcve) that reproduces your issue. For example, see [this sample CodePen](https://codepen.io/mckennapsean/pen/gdYzNY).

2. _Can I get edit access to the example spreadsheet?_

- No. This is being used to show a working example for anyone to copy, and an editable version could be broken accidentally, or maliciously, by any user.

3. _Why is the webpage forwarding to a bunch of text when I hit submit?_

- You are not properly loading the required Javascript which submits the data via AJAX, or your browser does not support AJAX. Please see Part 2 and check your console logs in case you are finding errors.

4. _Why is the webpage not successfully submitting the form?_

- Check your Javascript console logs. There could be an error while reading in the Javascript we have provided. There could be errors while submitting the form. It is required that your form have a class of `gform`, and also a `data-email` attribute if you have not set the `TO_ADDRESS` variable inside the Google Script file. Furthermore, the provided Javascript code also expects to see an email form element which it uses to check, a warning message for that element when an improper email is submitted, and then a `thank-you` div as well, which is shown after a form is successfully submitted. Please ensure that all of these HTML elements are in your form. See the sample file for code you can copy and paste. When you have all of these elements and a proper form set up, you should not see any error messages in your Javascript console when you hit submit.

5. _The webpage is saying my data was submitted, but why isn't my data being saved or sent to me?_

- When you copied the spreadsheet and published the Google Script, did you set the permissions to "Anyone, even Anonymous"? This is required for the form to work, since anyone on the internet can hit send to give you their data. Be sure that you have deployed the proper version of the script and used "Manage versions..." when making changes.

6. _How do I change the emails this script sends?_

- You can tweak the Google Script on the server to send emails to anyone and in whatever format you wish. This could be used to send a confirmation email to those contacting you, but we have not added this feature to this tutorial to avoid potential spamming. The sender of the email will always be the Google account you use to create the form/script, however. Further details on how to customize the email can be found in [the `MailApp` API](https://developers.google.com/apps-script/reference/mail/mail-app). You can instead use [the `GmailApp` API](https://developers.google.com/apps-script/reference/gmail/) which may be more flexible for certain use-cases.


7. _Is this secure? Can I use it for sensitive data?_

- No. While data that is sent over POST may be more protected, the information could easily be intercepted by a third party or middleman, and Google has complete access to the data inside a Google Spreadsheet. Email is also not a very secure communication medium by default. We would recommend you invest in a secure platform and server for storing your data if this is a requirement.


## Background Reading

+ Google Apps Scripts Basics: https://developers.google.com/apps-script/articles
+ Logger (like console.log):
https://developers.google.com/apps-script/reference/base/logger
+ Simple Mail Merge using Google Spreadsheets:
https://developers.google.com/apps-script/articles/mail_merge
+ Original Tutorial: AJAX post to google spreadsheet: http://stackoverflow.com/questions/10000020/ajax-post-to-google-spreadsheet which points to:
  + https://mashe.hawksey.info/2011/10/google-spreadsheets-as-a-database-insert-with-apps-script-form-postget-submit-method/


