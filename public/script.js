var app = new Vue({
  el: '#app',
  data: {
    Items: [],
    MaleNames: [],
    FemaleNames: [],
    LastNames: [],
    Callsigns: [],
    DisplayName: "",
    gender: false, //false = female, true = male
  },
  created() {
    this.sortItems();

  },
  methods: {
    async getItems() {
      //console.log("getting items");
      try {
        let response = await axios.get("/api/items");
        this.Items = response.data;
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    async sortItems() {
      await this.getItems();
      //console.log("sorting " + this.Items.length + " items.");
      this.MaleNames = [];
      this.FemaleNames = [];
      this.LastNames = [];
      this.Callsigns = [];
      var mname = [];
      var fname = [];
      var lname = [];
      var nick = [];
      var i;
      for (i = 0; i < this.Items.length; i++) {
        var item = this.Items[i];
        switch (item.type) {
          case "male":
            mname.push(item);
            break;
          case "female":
            fname.push(item);
            break;
          case "lname":
            lname.push(item);
            break;
          case "callsign":
            nick.push(item);
            break;
          default:
            //console.log("default case");
            break;
        }
        //console.log(lname);
        this.MaleNames = mname;
        this.FemaleNames = fname;
        this.LastNames = lname;
        this.Callsigns = nick;
      };
    },
    rando() {
      var fname = "";
      var csign = "";
      var lname = "";
      //console.log("randos mflc:");
      var maleNameLen = this.MaleNames.length;
      var maleIdx = Math.floor(Math.random() * maleNameLen);
      //console.log(maleIdx);
      var femaleNameLen = this.FemaleNames.length;
      var femaleIdx = Math.floor(Math.random() * femaleNameLen);
      //console.log(femaleIdx);
      var lastNameLen = this.LastNames.length;
      var lastIdx = Math.floor(Math.random() * lastNameLen);
      //console.log(lastIdx);
      var callLen = this.Callsigns.length;
      var callIdx = Math.floor(Math.random() * callLen);
      //console.log(callIdx);
      //male or female first name
      //false = female, true = male
      if (this.gender) {
        if (maleNameLen > 0) {
          fname = this.MaleNames[maleIdx].name;
        }
        else {
          console.log("no first name")
        }
      }
      else {
        if (femaleNameLen > 0) {
          fname = this.FemaleNames[femaleIdx].name;
        }
        else {
          console.log("no first name")
        }
      }
      if (callLen > 0) {
        csign = this.Callsigns[callIdx].name;
      }
      else {
        console.log("no callsign")
      }
      if (lastNameLen > 0) {
        lname = this.LastNames[lastIdx].name;
      }
      else {
        console.log("no last name")
      }

      this.DisplayName = fname + " \"" + csign + "\" " + lname;
    }
  }
});
