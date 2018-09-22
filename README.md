<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta content='width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1' name='viewport'/>
    <meta name="description" content="contact form example">
  <title>Contact Form Example</title>

</head>

<body>

  <h2 class="content-head is-center">Fale com a Prefeitura Municipal</h2>
  <aside>
       <p>
           Para enviar <em>elogios, sugestões ou críticas, </em> a Prefeitura de Baixa Grande do Ribeiro </p>
           <p>Utilize o <b><em>Formulário de Contato</em></b>
           abaixo para nos enviar a sua mensagem.
       </p>
   </aside>

<!-- START HERE -->
   <link rel="stylesheet" href="https://unpkg.com/purecss@1.0.0/build/pure-min.css">
   <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css">
   <link rel="stylesheet" href="https://doni7brandao.github.io/email_via_google/style.css">   

  <form class="gform pure-form pure-form-stacked" method="POST" data-email="donizetebrand@gmail.com"
  action="https://script.google.com/macros/s/AKfycbwfEWEnAkKoea67JNx8vYzvWfQ-eaiyKRe51CafwNJxT5AkUWo/exec">
    <!-- alterar a ação do formulário para seu URL de script -->

    <div class="form-elements">
      <fieldset class="pure-group">
        <label for="Nome">Nome: </label>
        <input id="Nome" name="Nome" placeholder="Seu nome aqui" />
      </fieldset>

      <fieldset class="pure-group">
        <label for="Mensagem">Mensagem: </label>
        <textarea id="Mensagem" name="Mensagem" rows="10"
        placeholder="Fique à vontade para no enviar sua mensagem..."></textarea>
      </fieldset>

      <fieldset class="pure-group">
        <label for="E-mail"><em>Seu</em> E-mail:</label>
        <input id="E-mail" name="E-mail" type="email" value=""
        required placeholder="seunome@email.com"/>
        <span class="email-invalid" style="display:none">
          Nos envie um e-mail válido</span>
      </fieldset>

      <fieldset class="pure-group">
        <label for="Assunto">Assunto: </label>
        <input id="Assunto" name="Assunto" placeholder="Qual é o assunto?" />
      </fieldset>

      <button class="button-success pure-button button-xlarge">
        <i class="fa fa-paper-plane"></i>&nbsp;Enviar Mensagem</button>
    </div>

    <!-- Personalize esta parte da mensagem de agradecimento após o envio da mensagem: -->
    <div class="thankyou_message" style="display:none;">
      <h2><em>Obrigado</em> pela sua mensagem!
        Estaremos lhe respondendo assim que possível!</h2>
    </div>

  </form>

  <!-- Envie o formulário para o Google usando "AJAX" -->
  <script data-cfasync="false" type="text/javascript" src="form-submission-handler.js"></script>
<!-- FIM -->

<p><a href="https://www.baixagrandedoribeiro.pi.gov.br/p/contato.html">Retornar</a></p>

</body>
</html>
