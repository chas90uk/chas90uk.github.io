//Call API On Load//
    $(function() {
        console.log( "ready!" );
        
    });
////

function strMatch(src, tgt) {
    // console.log(src, tgt);
    $('#strMatchResult').html("levenshteinDistance: " + levenshteinDistance(src,tgt) + 
    "<br>" + 
    "getEditDistance: " + getEditDistance(src,tgt));
}


function levenshteinDistance (src, tgt) {
    if (src.length === 0) return tgt.length;
    if (tgt.length === 0) return src.length;

    return Math.min(
        levenshteinDistance(
            src.substr(1)
            , tgt
        ) + 1
        ,levenshteinDistance(
            tgt.substr(1)
            , src
        ) + 1
        ,levenshteinDistance(
            src.substr(1)
            , tgt.substr(1)
        ) + (src[0] !== tgt[0] ? 1 : 0)
    );
}

// Compute the edit distance between the two given strings
function getEditDistance(src, tgt) {
    if (src.length === 0) return tgt.length; 
    if (tgt.length === 0) return src.length;
  
    var matrix = [];
  
    // increment along the first column of each row
    var i;
    for (i = 0; i <= tgt.length; i++) {
      matrix[i] = [i];
      
    }
    
  
    // increment each column in the first row
    var j;
    for (j = 0; j <= src.length; j++) {
      matrix[0][j] = j;
    }
  
    // Fill in the rest of the matrix
    for (i = 1; i <= tgt.length; i++) {
      for (j = 1; j <= src.length; j++) {
          
          
        if (tgt.charAt(i-1) == src.charAt(j-1)) {
          matrix[i][j] = matrix[i-1][j-1];
        } else {
          matrix[i][j] = Math.min(matrix[i-1][j-1] + 1, // substitution
                                  Math.min(matrix[i][j-1] + 1, // insertion
                                           matrix[i-1][j] + 1)); // deletion
        }
      }
    }
  
    return matrix[tgt.length][src.length];
  };