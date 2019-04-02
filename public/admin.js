var app = new Vue({
  el: '#admin',
  data: {
    name: "",
    type: "lname",
    addItem: null,
    items: [],
    findTitle: "",
    findItem: null,
    //suggestions: [],
  },
  created() {
    this.getItems();
  },
  computed: {
    suggestions() {
      return this.items.filter(item => item.name.toLowerCase().startsWith(this.findTitle.toLowerCase()));
    }
  },
  methods: {
    async upload() {
      try {
        let r1 = await axios.post('/api/items', {
          name: this.name,
          type: this.type,
        });
        this.getItems();
        this.name = "";
      } catch (error) {
        console.log(error);
      }
    },
    async getItems() {
      try {
        let response = await axios.get("/api/items");
        this.items = response.data;
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    selectItem(item) {
      this.findTitle = "";
      this.findItem = item;
    },
    async deleteItem(item) {
      try {
        let response = axios.delete("/api/items/" + item._id);
        this.findItem = null;
        this.getItems();
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    async editItem(item) {
      try {
        let response = await axios.put("/api/items/" + item._id, {
          name: this.findItem.name,
          type: this.findItem.type,
        });
        this.findItem = null;
        this.getItems();
        return true;
      } catch (error) {
        console.log(error);
      }
    },
  }
});
