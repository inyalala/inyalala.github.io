/* Course page renderer.
 *
 * Every individual course page is an empty shell. This file reads
 * data/<slug>.json and builds the whole page. To change course content,
 * edit the JSON. Never edit the course HTML files.
 *
 * The shell declares its slug via <body data-course="z2005">.
 */
(function () {
  'use strict';

  var esc = function (s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  };

  var has = function (v) {
    return Array.isArray(v) ? v.length > 0 : (v != null && String(v).trim() !== '');
  };

  var statusPill = function (status) {
    var map = { active: 'Active', upcoming: 'Upcoming', previous: 'Previous' };
    var label = map[status] || status;
    return '<span class="pill pill-' + esc(status) + '">' + esc(label) + '</span>';
  };

  /* ---------- section builders ---------- */

  function heroHtml(c) {
    var meta = [];
    if (has(c.program)) meta.push(esc(c.program) + (has(c.type) ? ' ' + esc(c.type) : ''));
    if (has(c.term)) meta.push(esc(c.term));
    if (has(c.credits)) meta.push(esc(c.credits) + ' credits');

    var links = '';
    if (c.links && has(c.links.syllabusPdf)) {
      links += '<a href="' + esc(c.links.syllabusPdf) + '" class="download-btn inline-flex items-center gap-2 py-2.5 px-6 rounded-lg text-sm">' +
               '<i class="fas fa-file-pdf"></i>Syllabus (PDF)</a>';
    }
    if (c.links && has(c.links.repo)) {
      links += '<a href="' + esc(c.links.repo) + '" target="_blank" rel="noopener" class="inline-flex items-center gap-2 py-2.5 px-6 rounded-lg text-sm border border-white/25 text-white hover:border-gold hover:text-gold transition-colors">' +
               '<i class="fab fa-github"></i>Materials Repository</a>';
    }
    if (c.links && has(c.links.questionBank)) {
      links += '<a href="' + esc(c.links.questionBank) + '" target="_blank" rel="noopener" class="inline-flex items-center gap-2 py-2.5 px-6 rounded-lg text-sm border border-white/25 text-white hover:border-gold hover:text-gold transition-colors">' +
               '<i class="fas fa-circle-question"></i>Question Bank</a>';
    }
    if (c.links && has(c.links.assignments)) {
      links += '<a href="' + esc(c.links.assignments) + '" target="_blank" rel="noopener" class="inline-flex items-center gap-2 py-2.5 px-6 rounded-lg text-sm border border-white/25 text-white hover:border-gold hover:text-gold transition-colors">' +
               '<i class="fas fa-pen-to-square"></i>Assignments</a>';
    }

    return '' +
      '<div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">' +
        '<a href="../index.html" class="text-gray-400 hover:text-gold text-xs font-semibold inline-flex items-center gap-2 mb-6 transition-colors">' +
          '<i class="fas fa-arrow-left text-[10px]"></i>All Courses</a>' +
        '<div class="flex flex-wrap items-center gap-2 mb-4">' +
          '<span class="pill pill-code">' + esc(c.code) + '</span>' + statusPill(c.status) +
        '</div>' +
        '<h1 class="text-3xl md:text-4xl font-display font-bold text-white mb-3">' + esc(c.title) + '</h1>' +
        (meta.length ? '<p class="text-gray-400 text-sm mb-5">' + meta.join(' &nbsp;·&nbsp; ') + '</p>' : '') +
        (has(c.summary) ? '<p class="text-gray-300 text-base leading-relaxed max-w-3xl mb-7">' + esc(c.summary) + '</p>' : '') +
        (links ? '<div class="flex flex-wrap gap-3">' + links + '</div>' : '') +
      '</div>';
  }

  function subnavHtml(sections) {
    return '<div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex gap-6 overflow-x-auto">' +
      sections.map(function (s) {
        return '<a href="#' + s.id + '" class="whitespace-nowrap">' + esc(s.label) + '</a>';
      }).join('') + '</div>';
  }

  function section(id, icon, title, body) {
    return '<section id="' + id + '" class="mb-14 scroll-mt-28">' +
      '<div class="sec-head"><i class="fas ' + icon + ' text-gold"></i><h2>' + esc(title) + '</h2></div>' +
      body + '</section>';
  }

  function atAGlance(c) {
    var rows = [];
    (c.meetings || []).forEach(function (m) {
      var parts = [m.when, m.where].filter(has);
      // Collapse repeated placeholders so an unscheduled slot reads "TBA", not "TBA · TBA".
      var uniq = parts.filter(function (p, i) { return parts.indexOf(p) === i; });
      rows.push({ icon: m.type === 'Lab' ? 'fa-flask' : 'fa-chalkboard',
                  label: m.type, value: uniq.join(' · ') || 'TBA' });
    });
    if (has(c.prerequisites)) {
      // Entries may be full sentences, so join on whitespace rather than commas.
      rows.push({ icon: 'fa-diagram-project', label: 'Prerequisites', value: c.prerequisites.join(' ') });
    }
    var inst = window.__COURSE_INSTRUCTOR__ || {};
    if (has(inst.name)) rows.push({ icon: 'fa-user', label: 'Instructor', value: inst.name });
    if (has(inst.officeHours)) rows.push({ icon: 'fa-clock', label: 'Office Hours', value: inst.officeHours });
    if (has(inst.office)) rows.push({ icon: 'fa-location-dot', label: 'Office', value: inst.office });
    if (has(inst.email)) rows.push({ icon: 'fa-envelope', label: 'Email',
      value: '<a href="mailto:' + esc(inst.email) + '" class="hover:text-gold transition-colors">' + esc(inst.email) + '</a>', raw: true });

    if (!rows.length) return '';
    return section('glance', 'fa-circle-info', 'At a Glance',
      '<div class="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">' +
      rows.map(function (r) {
        return '<div class="flex items-start gap-3">' +
          '<i class="fas ' + r.icon + ' text-gold mt-1 w-4 text-center"></i><div class="min-w-0">' +
          '<p class="text-[11px] uppercase tracking-widest text-gray-400 font-bold mb-0.5">' + esc(r.label) + '</p>' +
          '<p class="text-sm text-navy break-words">' + (r.raw ? r.value : esc(r.value)) + '</p></div></div>';
      }).join('') + '</div>');
  }

  function outcomes(c) {
    if (!has(c.outcomes)) return '';
    return section('outcomes', 'fa-bullseye', 'Learning Outcomes',
      '<div class="bg-white rounded-2xl border border-gray-100 shadow-sm p-7">' +
      '<p class="text-sm text-gray-500 mb-5">On successful completion of this course, a student will be able to:</p>' +
      '<ol class="space-y-3 list-none counter-reset">' +
      c.outcomes.map(function (o, i) {
        return '<li class="flex gap-3 text-sm text-gray-700 leading-relaxed">' +
          '<span class="flex-shrink-0 w-6 h-6 rounded-full bg-gold/15 text-gold text-xs font-bold flex items-center justify-center mt-0.5">' + (i + 1) + '</span>' +
          '<span>' + esc(o) + '</span></li>';
      }).join('') + '</ol></div>');
  }

  function resourceChips(m) {
    var out = [];
    // m.slides is either a single URL string (one deck for the week, the
    // original shape) or an array of {label, href} — one chip per lecture
    // session, for weeks built as several decks (e.g. 4 lectures/week).
    // Both shapes are supported so existing modules never need migrating.
    if (Array.isArray(m.slides) && m.slides.length) {
      m.slides.forEach(function (s) {
        var label = typeof s === 'string' ? 'Slides' : (s.label || 'Slides');
        var href = typeof s === 'string' ? s : s.href;
        out.push('<a href="' + esc(href) + '" class="chip"><i class="fas fa-display"></i>' + esc(label) + '</a>');
      });
    } else if (has(m.slides)) {
      out.push('<a href="' + esc(m.slides) + '" class="chip"><i class="fas fa-display"></i>Slides</a>');
    } else {
      out.push('<span class="chip chip-muted"><i class="fas fa-display"></i>Slides</span>');
    }
    (m.notebooks || []).forEach(function (nb) {
      var label = typeof nb === 'string' ? 'Notebook' : (nb.label || 'Notebook');
      var href = typeof nb === 'string' ? nb : nb.href;
      out.push('<a href="' + esc(href) + '" class="chip"><i class="fas fa-book-open"></i>' + esc(label) + '</a>');
    });
    if (has(m.lab)) out.push('<a href="' + esc(m.lab) + '" class="chip"><i class="fas fa-flask"></i>Lab</a>');
    return out.join(' ');
  }

  function schedule(c) {
    if (!has(c.modules)) return '';
    var rows = c.modules.map(function (m) {
      var a = m.assignment || {};
      var asgn = has(a.name)
        ? (has(a.link) ? '<a href="' + esc(a.link) + '" class="chip"><i class="fas fa-code"></i>' + esc(a.name) + '</a>'
                       : '<span class="chip chip-muted"><i class="fas fa-code"></i>' + esc(a.name) + '</span>') +
          (has(a.due) ? '<p class="text-[11px] text-gray-400 mt-1.5">Due ' + esc(a.due) + '</p>' : '')
        : '<span class="text-gray-300 text-xs">-</span>';

      return '<tr>' +
        '<td class="wk">' + esc(m.weeks || m.n) + '</td>' +
        '<td><p class="mod-title mb-1">' + esc(m.title) + '</p>' +
          (has(m.topics) ? '<p class="text-gray-500 text-[13px] leading-relaxed">' + esc(m.topics.join(' · ')) + '</p>' : '') +
          (has(m.readings) ? '<p class="text-gray-400 text-[11px] mt-1.5">Reading: ' + esc(m.readings.join('; ')) + '</p>' : '') +
        '</td>' +
        '<td><div class="flex flex-wrap gap-1.5">' + resourceChips(m) + '</div></td>' +
        '<td>' + asgn + '</td>' +
      '</tr>';
    }).join('');

    return section('schedule', 'fa-calendar-days', 'Schedule and Materials',
      '<div class="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">' +
        '<div class="overflow-x-auto"><table class="sched"><thead><tr>' +
        '<th>Week</th><th>Module</th><th>Materials</th><th>Assignment</th>' +
        '</tr></thead><tbody>' + rows + '</tbody></table></div>' +
        '<p class="text-[11px] text-gray-400 px-4 py-3 border-t border-gray-100">' +
        'Dashed items are not yet released. Materials are published as each module begins.</p>' +
      '</div>');
  }

  function grading(c) {
    if (!has(c.grading)) return '';
    var total = c.grading.reduce(function (s, g) { return s + (Number(g.weight) || 0); }, 0);
    return section('grading', 'fa-scale-balanced', 'Assessment',
      '<div class="bg-white rounded-2xl border border-gray-100 shadow-sm p-7">' +
      '<div class="space-y-4">' +
      c.grading.map(function (g) {
        var w = Number(g.weight) || 0;
        return '<div>' +
          '<div class="flex items-baseline justify-between mb-1.5">' +
            '<p class="text-sm font-semibold text-navy">' + esc(g.component) + '</p>' +
            '<p class="text-sm font-bold text-gold tabular-nums">' + w + '%</p></div>' +
          '<div class="h-1.5 bg-gray-100 rounded-full overflow-hidden">' +
            '<div class="h-full bg-gold rounded-full" style="width:' + w + '%"></div></div>' +
          (has(g.note) ? '<p class="text-xs text-gray-500 mt-1.5">' + esc(g.note) + '</p>' : '') +
        '</div>';
      }).join('') + '</div>' +
      (total !== 100 ? '<p class="text-xs text-red-600 mt-5 font-semibold">Weights currently total ' + total + '%. Check the course JSON.</p>' : '') +
      '</div>');
  }

  function readings(c) {
    if (!has(c.textbooks)) return '';
    return section('readings', 'fa-book', 'Texts and References',
      '<div class="bg-white rounded-2xl border border-gray-100 shadow-sm divide-y divide-gray-100">' +
      c.textbooks.map(function (b) {
        return '<div class="p-5 flex items-start gap-4">' +
          '<i class="fas fa-book text-gold mt-1"></i><div class="min-w-0">' +
          '<p class="text-sm font-semibold text-navy">' + esc(b.title) + (has(b.edition) ? ', ' + esc(b.edition) : '') + '</p>' +
          (has(b.authors) ? '<p class="text-xs text-gray-500 mt-0.5">' + esc(b.authors) + '</p>' : '') +
          (has(b.note) ? '<p class="text-xs text-gray-400 mt-1">' + esc(b.note) + '</p>' : '') +
          '</div>' +
          (has(b.role) ? '<span class="pill ' + (b.role === 'Required' ? 'pill-upcoming' : 'pill-previous') + ' ml-auto flex-shrink-0">' + esc(b.role) + '</span>' : '') +
        '</div>';
      }).join('') + '</div>');
  }

  function policies(c) {
    var p = c.policies || {};
    var labels = {
      attendance: 'Attendance', lateWork: 'Late Work', integrity: 'Academic Integrity',
      aiTools: 'Use of AI Tools', accommodations: 'Accommodations'
    };
    var items = Object.keys(labels).filter(function (k) { return has(p[k]); });
    if (!items.length) return '';
    return section('policies', 'fa-gavel', 'Course Policies',
      '<div class="bg-white rounded-2xl border border-gray-100 shadow-sm divide-y divide-gray-100">' +
      items.map(function (k) {
        return '<div class="p-6"><p class="text-[11px] uppercase tracking-widest text-gray-400 font-bold mb-2">' +
          esc(labels[k]) + '</p><p class="text-sm text-gray-700 leading-relaxed">' + esc(p[k]) + '</p></div>';
      }).join('') + '</div>');
  }

  /* ---------- boot ---------- */

  function render(c, instructor) {
    window.__COURSE_INSTRUCTOR__ = instructor || {};

    document.title = c.code + ' ' + c.title + ' | Dr. Innocent Nyalala';
    var d = document.querySelector('meta[name="description"]');
    if (d && has(c.summary)) d.setAttribute('content', c.code + ' ' + c.title + '. ' + c.summary);

    document.getElementById('course-hero').innerHTML = heroHtml(c);

    var body = [atAGlance(c), outcomes(c), schedule(c), grading(c), readings(c), policies(c)]
      .filter(Boolean).join('');
    document.getElementById('course-body').innerHTML = body;

    var known = [
      { id: 'glance', label: 'At a Glance' }, { id: 'outcomes', label: 'Outcomes' },
      { id: 'schedule', label: 'Schedule' }, { id: 'grading', label: 'Assessment' },
      { id: 'readings', label: 'Readings' }, { id: 'policies', label: 'Policies' }
    ].filter(function (s) { return document.getElementById(s.id); });
    document.getElementById('course-subnav').innerHTML = subnavHtml(known);
  }

  function fail(msg) {
    document.getElementById('course-body').innerHTML =
      '<div class="bg-white rounded-2xl border border-red-200 p-8 text-center">' +
      '<i class="fas fa-triangle-exclamation text-red-500 text-2xl mb-3"></i>' +
      '<p class="text-navy font-semibold mb-1">Course data could not be loaded.</p>' +
      '<p class="text-sm text-gray-500">' + esc(msg) + '</p></div>';
  }

  document.addEventListener('DOMContentLoaded', function () {
    var slug = document.body.getAttribute('data-course');
    if (!slug) return fail('No data-course attribute on <body>.');

    Promise.all([
      fetch('../data/courses.json', { cache: 'no-store' }).then(function (r) { return r.json(); }),
      fetch('../data/' + slug + '.json', { cache: 'no-store' }).then(function (r) {
        if (!r.ok) throw new Error('data/' + slug + '.json returned ' + r.status);
        return r.json();
      })
    ]).then(function (res) {
      render(res[1], res[0].instructor);
    }).catch(function (e) {
      fail(e.message + ' (course pages must be served over http, not opened from the file system)');
    });
  });
})();
