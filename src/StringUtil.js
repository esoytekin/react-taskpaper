/**
 * Created by emrahsoytekin on 16.06.2018.
 */
const StringUtil = (function() {

    function isUrl (text) {
        const urlRegex =/[(http|https|ftp|ftps)://]?([a-zA-Z0-9\-.]+\.[a-zA-Z]{2,3})(\/\S*)?/ig;

        let n = text.search(urlRegex);

        return n !== -1;


    }

    function parsedNote(note){
        if(!note)
            return;
        note = note.replace(/\n/g,"<br />");

        if(isUrl(note)){
            return parseUrl(note);
        }else{
            return note;

        }

    }

    function parseUrl(text){
        /**
         * <br /> gore split et
         * onlari da kendi icinde bosluga gore split et
         * duzenle
         * join et
         *
         *
         */

        const regex= /((http|https|ftp|ftps):\/\/)?([a-zA-Z0-9\-.]+\.[a-zA-Z]{2,3})(\/.*)?/ig;
        const elements = text.split("<br />");
        for(let i in elements){
            let subelements = (elements[i]).split(" ");
            for(let k in subelements){
                let text = subelements[k];
                subelements[k] = text.replace(regex,'<a href="'+text+'" target="_blank" >$3</a>');
            }
            elements[i] = subelements.join(" ");
        }
        return elements.join("<br />");

    }

    return {
        parsedNote:parsedNote
    }
})();

export default StringUtil;

