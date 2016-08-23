/*jslint browser: true*/
/*jslint nomen: true */
/*jslint node: true */

/*global $, _, jQuery, alert, console, moment, UUIDjs, c3, d3 */

"use strict";

var ds = {};

ds.cards = [
    {
        'id': 1,
        'color': 'blue',
        'question': 'First Title',
        'why': 'Why 1',
        'lookingintoit': '',
        'whatwedid': '',
        'likes': 1,
        'comments': [
            {
                'text': 'Second Comment sdjhasdfs fsd fgsdf gsf hsf hg rsts ethftx hdz gsf hdr tdz hcf hdzr gsfth sdg dxr gfzdf gdzf gd ',
                'createdon': '14 Jul 2016 10:35am'
            },
            {
                'text': 'First Comment',
                'createdon': '14 Jul 2016 10:30am'
            }
        ]
    },
    {
        'id': 2,
        'color': 'blue',
        'question': 'Second Title',
        'why': 'Why 2',
        'lookingintoit': 'lookingintoit 2',
        'whatwedid': '',
        'likes': 1,
        'comments': [
        ]
    },
    {
        'id': 3,
        'color': 'green',
        'question': 'Third Title',
        'why': 'Why 3',
        'lookingintoit': 'lookingintoit 3',
        'whatwedid': 'whatwedid 3',
        'likes': 0,
        'comments': [
        ]
    },
    {
        'id': 4,
        'color': 'blue',
        'question': 'Fourth Title',
        'why': 'Why 4',
        'lookingintoit': 'lookingintoit 4',
        'whatwedid': 'whatwedid 4',
        'likes': 5,
        'comments': [
        ]
    }
];


ds.get_cards = function (callback) {
    $.getJSON('card', function (cards) {
        $.getJSON('comment', function (_comments) {
            var comments = _.groupBy(_comments, 'card_id');
            _.each(cards, function (card) {
                if (comments[card.id] !== undefined) {
                    card.comments = comments[card.id];
                } else {
                    card.comments = [];
                }
            });
            callback(cards);
        });
    })
        .error(function () {
            callback(ds.cards);
        });
};

ds.update_card_details = function (id, question, why, lookingintoit, whatwedid) {
    var payload = {
            'question': question,
            'why': why,
            'lookingintoit': lookingintoit,
            'whatwedid': whatwedid
        };
    $.post('/card/' + id, JSON.stringify(payload), function (data) {
        console.log('ds.update_card_details.1 ', payload, data);
    })
        .error(function (err) {
            console.log('ds.update_card_details.2 ', payload, err);
        });
};

ds.add_comment = function (id, description) {
  var payload = {
          'description': description,
      };
  $.post('/card/' + id + '/comment', JSON.stringify(payload), function (data) {
      console.log('ds.add_comment.1 ', payload, data);
  })
      .error(function (err) {
          console.log('ds.add_comment.2 ', payload, err);
      });
};
