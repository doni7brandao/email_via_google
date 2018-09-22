/******************************************************************************
 * Este tutorial é baseado no trabalho de Martin Hawksey twitter.com/mhawksey  *
 * Mas foi simplificado e limpo para torná-lo mais amigável para principiantes *
 * Todo o crédito por este trabalho vai para Martin Hawksey                    *
 ******************************************************************************/

// se você quiser armazenar seu e-mail do lado do servidor (oculto), remova o comentário da próxima linha
var TO_ADDRESS = "donizetebrand@gmail.com";

// mostrar todas as chaves/valores do formulário em HTML para email
// usa uma matriz de chaves, se fornecida, ou o objeto para determinar a ordem de campo
function formatMailBody(obj, order) {
  var result = "";
  if (!order) {
    order = Object.keys(obj);
  }
  
  // loop sobre todas as chaves nos dados do formulário ordenado
  for (var idx in order) {
    var key = order[idx];
    result += "<h2 style='text-transform: capitalize; margin-bottom: 0'>" + key + "</h2><div>" + sanitizeInput(obj[key]) + "</div>";
    // para cada chave, concatene uma `<h2/>`/`<div/>` pareamento do nome da chave e seu valor, 
    // e anexá-lo à string `result` criada no início.
  }
  return result; // uma vez que o loop é feito, `result` será uma longa string para colocar no corpo do email
}

// limpar o conteúdo do usuário - não confie em ninguém 
// ref: https://developers.google.com/apps-script/reference/html/html-output#appendUntrusted(String)
function sanitizeInput(rawInput) {
   var placeholder = HtmlService.createHtmlOutput(" ");
   placeholder.appendUntrusted(rawInput);
  
   return placeholder.getContent();
 }

function doPost(e) {

  try {
    Logger.log(e); // the Google Script version of console.log see: Class Logger
    record_data(e);
    
    // nome mais curto para dados de formulário
    var mailData = e.parameters;

    // nomes e ordem dos elementos de formulário (se definido)
    var orderParameter = e.parameters.formDataNameOrder;
    var dataOrder;
    if (orderParameter) {
      dataOrder = JSON.parse(orderParameter);
    }
    
    // determinar o destinatário do email
    // se você tiver seu e-mail descomentado acima, ele usa isso `TO_ADDRESS`
    // caso contrário, o padrão será o email fornecido pelo atributo de dados do formulário
    var sendEmailTo = (typeof TO_ADDRESS !== "undefined") ? TO_ADDRESS : mailData.formGoogleSendEmail;
    
    // enviar e-mail se o endereço estiver definido
    if (sendEmailTo) {
      MailApp.sendEmail({
        to: String(sendEmailTo),
        subject: "Nova Mensagem pelo site da Prefeitura de Baixa Grande do Ribeiro",
        // replyTo: String(mailData.email), // Isso é opcional e depende de seu formulário realmente coletando um campo chamado `email`
        htmlBody: formatMailBody(mailData, dataOrder)
      });
    }

    return ContentService    // retorno json resultados de sucesso
          .createTextOutput(
            JSON.stringify({"result":"success",
                            "data": JSON.stringify(e.parameters) }))
          .setMimeType(ContentService.MimeType.JSON);
  } catch(error) { // se isto retornar um erro
    Logger.log(error);
    return ContentService
          .createTextOutput(JSON.stringify({"result":"error", "error": error}))
          .setMimeType(ContentService.MimeType.JSON);
  }
}


/**
 * record_data insere os dados recebidos do envio do formulário html
 * e são os dados recebidos do POST
 */
function record_data(e) {
  var lock = LockService.getDocumentLock();
  lock.waitLock(30000); // segure até 30 seg para evitar escrita simultânea
  
  try {
    Logger.log(JSON.stringify(e)); // registrar os dados do POST no caso de precisarmos depurá-lo
    
    // selecione a planilha 'responses' por padrão
    var doc = SpreadsheetApp.getActiveSpreadsheet();
    var sheetName = e.parameters.formGoogleSheetName || "responses";
    var sheet = doc.getSheetByName(sheetName);
    
    var oldHeader = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    var newHeader = oldHeader.slice();
    var fieldsFromForm = getDataColumns(e.parameters);
    var row = [new Date()]; // primeiro elemento na linha deve ser sempre um timestamp
    
    // loop através das colunas do cabeçalho
    for (var i = 1; i < oldHeader.length; i++) { // start at 1 to avoid Timestamp column
      var field = oldHeader[i];
      var output = getFieldFromData(field, e.parameters);
      row.push(output);
      
      // marcar como armazenado, removendo dos campos de formulário
      var formIndex = fieldsFromForm.indexOf(field);
      if (formIndex > -1) {
        fieldsFromForm.splice(formIndex, 1);
      }
    }
    
    // definir novos campos em nosso formulário
    for (var i = 0; i < fieldsFromForm.length; i++) {
      var field = fieldsFromForm[i];
      var output = getFieldFromData(field, e.parameters);
      row.push(output);
      newHeader.push(field);
    }
    
    // mais eficiente para definir valores como matriz [] [] do que individualmente
    var nextRow = sheet.getLastRow() + 1; // obter a próxima linha
    sheet.getRange(nextRow, 1, 1, row.length).setValues([row]);

    // atualizar linha de cabeçalho com novos dados
    if (newHeader.length > oldHeader.length) {
      sheet.getRange(1, 1, 1, newHeader.length).setValues([newHeader]);
    }
  }
  catch(error) {
    Logger.log(error);
  }
  finally {
    lock.releaseLock();
    return;
  }

}

function getDataColumns(data) {
  return Object.keys(data).filter(function(column) {
    return !(column === 'formDataNameOrder' || column === 'formGoogleSheetName' || column === 'formGoogleSendEmail' || column === 'honeypot');
  });
}

function getFieldFromData(field, data) {
  var values = data[field] || '';
  var output = values.join ? values.join(', ') : values;
  return output;
}