if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault('counter', 0);
  Session.setDefault('value', 0);
  Session.setDefault('value2', '');

  Template.converter.helpers({
    value: function(){
      return Session.get('value');
    }
  });

  Template.converter2.helpers({
    value2: function(){
      return Session.get('value2');
    }
  });

  Template.converter.events({
    'submit .form': function (event) {
      // increment the counter when button is clicked
      //Session.set('counter', Session.get('counter') + 1);
      event.preventDefault();
      var dia= event.target.dia.value;
      var mes= event.target.mes.value;
      var ano= event.target.ano.value;

      dia= parseInt(dia);
      mes= parseInt(mes);
      ano= parseInt(ano);
      console.log('Valores:'+dia+' '+mes+' '+ano);

      if(mes<3){
        ano = ano-1;
        mes = mes+ 12;
      }
      var a = ano / 100;
      var b = a / 4;
      a= parseInt(a);b= parseInt(b);
      var c = 2 - a + b;
      var e = (365.25 * (ano + 4716));
      var f = (30.6001 * (mes + 1));
      var jd = c + parseInt(dia) + parseInt(e) + parseInt(f) - 1524.5;
      // need to subtract out December 31, 1899
      var julianDay = (jd - 2415019.5);
      console.log('a:'+a+' b:'+b+' c:'+c+' e:'+e+' f:'+f+' jd:'+jd+' julinDay:'+julianDay);
      console.log('Valores:'+dia+' '+mes+' '+ano+' = '+julianDay);
      Session.set('value', julianDay);
    }
  });

  Template.converter2.events({
    'submit .form2':function(event){
      event.preventDefault();
      var juliano= event.target.juliano.value;
      juliano= parseInt(juliano);
      console.log('Juliano:'+juliano);
      var z = juliano + 2415020;
      z= parseInt(z);
	    var w = parseInt((z - 1867216.25) / 36524.25);
	    var x = w / 4;
	    var a = z + 1 + w - x;
	    var b = a + 1524;
	    var c = parseInt((b - 122.1) / 365.25);
	    var d = parseInt(365.25 * c);
	    var e = parseInt((b - d) / 30.6001);
	    var f = parseInt(30.6001 * e);
	    var day = parseInt(b - d - f);
	    var month = (e - 1 > 12) ? e - 13 : e - 1;
	    var year = (month < 3) ? c - 4715 : c - 4716;
      console.log(day+'/'+month+'/'+year);
      Session.set('value2', day+'/'+month+'/'+year);
    }
  });

}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
