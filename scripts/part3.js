var part3controller = {
    _log: [],

    buildProfile: function (seq1, seq2) {
        if (seq1.length != seq2.length) {
            throw new EventException("Ciągi nie są tej samej długości");
        }

        var finalProfile = [];

        for (var i in seq1) {
            var tempIP = new IndexProfile(i);
            tempIP.addSymbol(seq1.charAt(i));
            tempIP.addSymbol(seq2.charAt(i));
            finalProfile.push(tempIP);
        }

        return finalProfile;
    },

    buildSummarySequence: function (profile) {
        var toReturn = "";

        profile.forEach(function (item) {
            toReturn += item.getMostPropablyChar();
        });

        console.log(toReturn);
        return toReturn;
    },

    stringalign: function (ainstr, binstr, mispen, gappen, skwpen) {
        var gapSign = '_';
        s1 = ainstr.split('');
        s2 = binstr.split('');
        var i, j, k;
        var dn, rt, dg;
        var s1Length = s1.length, s2Length = s2.length;
        var s1Out = []; // .resize(ia+ib);
        var s2Out = [];
        var summary = [];

        var cost = [];
        var marked = [];
        for (n = 0; n < s1Length + 1; ++n) {
            cost[n] = new Array(s2Length + 1);
            marked[n] = new Array(s2Length + 1);
        }

        cost[0][0] = 0.;
        for (i = 1; i <= s1Length; i++) {
            cost[i][0] = cost[i - 1][0] + skwpen;
        }
        for (i = 1; i <= s2Length; i++) {
            cost[0][i] = cost[0][i - 1] + skwpen;
        }
        for (i = 1; i <= s1Length; i++) for (j = 1; j <= s2Length; j++) {
            dn = cost[i - 1][j] + ((j == s2Length) ? skwpen : gappen);
            rt = cost[i][j - 1] + ((i == s1Length) ? skwpen : gappen);
            dg = cost[i - 1][j - 1] + ((s1[i - 1] == s2[j - 1]) ? -1. : mispen);
            cost[i][j] = Math.min(dn, rt, dg);
        }
        i = s1Length;
        j = s2Length;
        k = 0;
        while (i > 0 || j > 0) {
            marked[i][j] = 1;
            dn = rt = dg = 9.99e99;
            if (i > 0) dn = cost[i - 1][j] + ((j == s2Length) ? skwpen : gappen);
            if (j > 0) rt = cost[i][j - 1] + ((i == s1Length) ? skwpen : gappen);
            if (i > 0 && j > 0) dg = cost[i - 1][j - 1] +
                ((s1[i - 1] == s2[j - 1]) ? -1. : mispen);
            if (dg <= Math.min(dn, rt)) {
                s1Out[k] = s1[i - 1];
                s2Out[k] = s2[j - 1];
                summary[k++] = ((s1[i - 1] == s2[j - 1]) ? '=' : '!');
                i--;
                j--;
            }
            else if (dn < rt) {
                s1Out[k] = s1[i - 1];
                s2Out[k] = gapSign;
                summary[k++] = gapSign;
                i--;
            }
            else {
                s1Out[k] = gapSign;
                s2Out[k] = s2[j - 1];
                summary[k++] = gapSign;
                j--;
            }
            marked[i][j] = 1;
        }
        for (i = 0; i < k / 2; i++) {
            var t = s1Out[k - 1 - i];
            s1Out[k - 1 - i] = s1Out[i];
            s1Out[i] = t;

            t = s2Out[k - 1 - i];
            s2Out[k - 1 - i] = s2Out[i];
            s2Out[i] = t;

            t = summary[k - 1 - i];
            summary[k - 1 - i] = summary[i];
            summary[i] = t;
        }
        s1Out.size = k;
        s2Out.size = k;
        summary.size = k;


        //console.log(s1Out.join(''));
        //console.log(s2Out.join(''));
        //console.log(summary.join(''));

        return {
            s1: s1Out.join(''),
            s2: s2Out.join(''),
            summary: summary.join('')
        };
    },

    logStep: function (nodeName, NWObject, profile, summarySeq) {
        this._log.push({
            Name: nodeName,
            NWObject: NWObject,
            Profile: profile,
            SummarySeq: summarySeq
        })
    },

    calculateNode: function (treeNode) {
        //Jeśli to liść - zwróć ciąg
        if (treeNode.seq != null) {
            return treeNode.seq;
        }

        //Jeśli to nie jest liść to rekurencyjnie oblicz dany node
        var NWObject = this.stringalign(
            this.calculateNode(treeNode.children[0]),
            this.calculateNode(treeNode.children[1]),
            1, 1, 0.5);
        var profile = this.buildProfile(NWObject.s1, NWObject.s2);
        var summarySeq = this.buildSummarySequence(profile);

        treeNode.seq = summarySeq;
        this.logStep(treeNode.name, NWObject, profile, summarySeq);

        return summarySeq;
    },

    getProfileRowHTML: function (profile, char) {
        var rowHTML = "";
        rowHTML += '<tr>' +
            '<td style="border: 1px solid black; background: lightblue">' + char + '</td>';
        profile.forEach(function (indexProf) {
            rowHTML += '<td style="border: 1px solid black;">' + indexProf.getProfilePropability(char) + '</td>';
        });
        rowHTML += '</tr>';
        return rowHTML;
    },

    getProfileHTML: function (profile) {
        var profileHTML = '<table style="text-align: center; width:100%">';
        profileHTML += this.getProfileRowHTML(profile, 'A');
        profileHTML += this.getProfileRowHTML(profile, 'T');
        profileHTML += this.getProfileRowHTML(profile, 'G');
        profileHTML += this.getProfileRowHTML(profile, 'C');
        //end table
        profileHTML += '</table>';
        return profileHTML;
    },

    getStepHtml: function(stepContent) {
        var vm = this;
        var stepHTML = "";
        stepHTML += '<h2>' + stepContent.Name + '</h2><h4>a) Needleman-Wunsch:</h4> ' +
            '<table> ' +
            '<tr> <td>1)</td> <td>' + stepContent.NWObject.s1 + '</td> </tr> ' +
            '<tr> <td>2)</td> <td>' + stepContent.NWObject.s2 + '</td> </tr> ' +
            '</table>';
        stepHTML += '<h4>b) Profil:</h4>';
        stepHTML += vm.getProfileHTML(stepContent.Profile);

        stepHTML += '<h4>c) Sekwencja konsensusowa:</h4>';
        stepHTML += '<a>' + stepContent.SummarySeq + '</a>';

        return stepHTML;
    },

    displayLog: function () {
        var vm = this;
        var contentHTML = '';
        this._log.forEach(function(log) {
            contentHTML += vm.getStepHtml(log);
        });
        $('#part3Content').html(contentHTML);
    },

    runPart3: function (tree) {
        this.calculateNode(tree._root.children[0]);
        this.displayLog();
        nextStep(5);
    },
    
    clearPart3: function() {
        this._log = [];
        $('#part3Content').html();
    }
};