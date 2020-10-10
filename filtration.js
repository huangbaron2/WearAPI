const index = require('./index')


const filter = () => {
    for (i of index.clothing){
        for (o of i['brand']){
            if ((!(index.brand.includes(o))) && o != "Any"){
                index.brand.push(o);
            }
        }
        for (o of i['model']){
            if ((!(index.model.includes(o))) && o != "Any"){
                index.model.push(o);
            }
        }
        for (o of i['color']){
            if ((!(index.color.includes(o))) && o != "Any"){
                index.color.push(o);
            }
        }
        for (o of i['article']){
            if ((!(index.article.includes(o))) && o != "Any"){
                index.article.push(o);
            }
        }
        for (o of i['category']){
            if ((!(index.category.includes(o))) && o != "Any"){
                index.category.push(o);
            }
        }
    }
};

exports.filter = filter;