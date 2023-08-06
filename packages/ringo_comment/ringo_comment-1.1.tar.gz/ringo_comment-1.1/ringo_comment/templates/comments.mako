<script>
// The following javascript code is taken from the Bugzilla Bug Tracking System.
//
// Copyright information about Bugzilla Bug Tracking System:
//
//  The Original Code is the Bugzilla Bug Tracking System.
//
//  The Initial Developer of the Original Code is Netscape Communications
//  Corporation. Portions created by Netscape are
//  Copyright (C) 1998 Netscape Communications Corporation. All
//  Rights Reserved.
//
// License: http://www.mozilla.org/MPL/MPL-1.1.html

/* Adds the reply text to the `comment' textarea */
function replyToComment(id) {
    var prefix = "In reply to msg" + id + ":\n";
    var replytext = "";
      /* pre id="text_msgN" */
      var text_elem = document.getElementById('comment-'+id);
      var text = getText(text_elem);

      /* make sure we split on all newlines -- IE or Moz use \r and \n
       * respectively.
       */
      text = text.split(/\r|\n/);

      for (var i=0; i < text.length; i++) {
          replytext += "> " + text[i] + "\n"; 
      }

      replytext = prefix + replytext + "\n";


    /* <textarea id="comment"> */
      var textarea = document.getElementById('new-comment');
    textarea.value += replytext;

    textarea.focus();
}

if (typeof Node == 'undefined') {
    /* MSIE doesn't define Node, so provide a compatibility object */
    window.Node = {
        TEXT_NODE: 3,
        ENTITY_REFERENCE_NODE: 5
    };
}

/* Concatenates all text from element's childNodes. This is used
 * instead of innerHTML because we want the actual text (and
 * innerText is non-standard).
 */
function getText(element) {
    var child, text = "";
    for (var i=0; i < element.childNodes.length; i++) {
        child = element.childNodes[i];
        var type = child.nodeType;
        if (type == Node.TEXT_NODE || type == Node.ENTITY_REFERENCE_NODE) {
            text += child.nodeValue;
        } else {
            /* recurse into nodes of other types */
            text += getText(child);
        }
    }
    return text;
}
</script>
<textarea class="form-control" rows="10" id="new-comment" name="comment">${last_comment}</textarea>
<label for="">
  ${field.label} (${len(comments)})
</label>
% for comment in comments[::-1]:
  <input type="checkbox" name="${field.name}" value="${comment.id}" style="display:none"/>
  <div class="readonlyfield">
    <table>
      <tr>
        <td id="comment-${comment.id}">${comment.text.replace('\n', '<br>') | n}</td>
      </tr>
      <tr>
        <td>
        <small>
        #${comment.id}
        <% 
        str_updated = comment.updated.strftime("%y.%m.%d %H:%M")
        str_created = comment.created.strftime("%y.%m.%d %H:%M")
        %>
        ${str_created} | <bold>${comment.owner.profile[0]}</bold>
        % if str_updated != str_created:
            | ${str_updated}
        % endif
        | <a href="#add_change_note" onclick="replyToComment(${comment.id}); return false;"><i class="fa fa-reply" aria-hidden="true"></i> ${_("Reply")}</a>
        </small>
        </td>
      </tr>
    </table>
  </div>
% endfor
