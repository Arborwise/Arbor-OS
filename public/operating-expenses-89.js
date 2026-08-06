'use strict';
(() => {
  const EXPENSES = [
    {
      date: '2026-08-06',
      category: 'Fuel / Gas',
      amount: 100,
      source: 'QuickBooks'
    }
  ];

  const money = value => new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(Number(value || 0));

  const dateLabel = iso => {
    const [year, month, day] = String(iso).split('-').map(Number);
    if (!year || !month || !day) return String(iso || '');
    return new Intl.DateTimeFormat('en-US', {
      timeZone: 'UTC',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).format(new Date(Date.UTC(year, month - 1, day, 12)));
  };

  const installStyles = () => {
    if (document.getElementById('operatingExpenseStyles89')) return;
    const style = document.createElement('style');
    style.id = 'operatingExpenseStyles89';
    style.textContent = `
      #operatingExpenseStrip89{
        box-sizing:border-box;
        width:100%;
        padding:10px 12px;
        background:#fff8e8;
        border-top:1px solid #ead9ae;
        border-bottom:1px solid #dcc48c;
      }
      #operatingExpenseStrip89 .expenseHeading89{
        display:flex;
        align-items:center;
        justify-content:space-between;
        gap:10px;
        max-width:760px;
        margin:0 auto 7px;
        color:#17402b;
        font-size:12px;
        font-weight:950;
        letter-spacing:.08em;
      }
      #operatingExpenseStrip89 .expenseCount89{
        display:inline-flex;
        align-items:center;
        justify-content:center;
        min-width:25px;
        height:25px;
        padding:0 7px;
        border-radius:999px;
        background:#17402b;
        color:#fff;
        letter-spacing:0;
      }
      #operatingExpenseStrip89 .expenseCard89{
        display:grid;
        grid-template-columns:minmax(0,1fr) auto;
        gap:5px 12px;
        max-width:760px;
        margin:0 auto;
        padding:12px 14px;
        border:1px solid #d5bd83;
        border-left:7px solid #d98717;
        border-radius:14px;
        background:#fff;
        box-shadow:0 2px 7px rgba(61,44,12,.08);
      }
      #operatingExpenseStrip89 .expenseCategory89{
        color:#183f2d;
        font-size:17px;
        font-weight:950;
      }
      #operatingExpenseStrip89 .expenseAmount89{
        color:#8f3f05;
        font-size:19px;
        font-weight:1000;
        text-align:right;
      }
      #operatingExpenseStrip89 .expenseMeta89{
        grid-column:1 / -1;
        color:#676154;
        font-size:12px;
        font-weight:800;
      }
      @media(max-width:390px){
        #operatingExpenseStrip89{padding:8px 9px}
        #operatingExpenseStrip89 .expenseCard89{padding:10px 11px}
        #operatingExpenseStrip89 .expenseCategory89{font-size:15px}
        #operatingExpenseStrip89 .expenseAmount89{font-size:17px}
      }
    `;
    document.head.appendChild(style);
  };

  const render = () => {
    installStyles();
    const anchor = document.getElementById('groupFilters54') || document.getElementById('filters');
    if (!anchor) return false;

    let strip = document.getElementById('operatingExpenseStrip89');
    if (!strip) {
      strip = document.createElement('section');
      strip.id = 'operatingExpenseStrip89';
      strip.setAttribute('aria-label', 'Recent Arborwise operating expenses');
      anchor.insertAdjacentElement('afterend', strip);
    }

    strip.innerHTML = `
      <div class="expenseHeading89">
        <span>OPERATING EXPENSES</span>
        <span class="expenseCount89">${EXPENSES.length}</span>
      </div>
      ${EXPENSES.map(expense => `
        <article class="expenseCard89">
          <div class="expenseCategory89">${expense.category}</div>
          <div class="expenseAmount89">${money(expense.amount)}</div>
          <div class="expenseMeta89">${dateLabel(expense.date)} • Recorded in ${expense.source}</div>
        </article>
      `).join('')}
    `;

    window.ARBORWISE_OPERATING_EXPENSES = EXPENSES.map(expense => ({...expense}));
    return true;
  };

  const ready = () => {
    if (render()) return;
    let attempts = 0;
    const retry = setInterval(() => {
      attempts += 1;
      if (render() || attempts >= 20) clearInterval(retry);
    }, 150);
  };

  window.addEventListener('arborwise:data-ready', render);
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', ready, {once: true});
  else ready();
})();
