import React, { useState } from 'react';
import './App.css';
import fig1 from '../images/fig1.png';
import fig2 from '../images/fig2.png';

// Data for the tutorial chapters
const tutorialData = [
  {
    id: 1,
    title: "Chapter 1: Intro to dbt & Modern Data Stack",
    content: () => (
      <div className="chapter-content">
        <h2 className="chapter-title">Welcome to the New Era of Data Transformation</h2>
        <p className="chapter-paragraph">Welcome to the world of dbt. If you work with data, you've likely heard the acronym, and for good reason. <strong>dbt (data build tool)</strong> has fundamentally changed how data teams operate. It’s not just a tool; it’s a philosophy for managing the entire analytics workflow, from raw data to actionable insights. At its heart, dbt empowers data professionals to build reliable, scalable, and maintainable data transformation pipelines using the language they already know and love: SQL.</p>
        
        <h3 className="chapter-subtitle">The Pain Points dbt Solves</h3>
        <ul className="chapter-list">
          <li className="list-item-card">
            <span className="list-item-emoji">🌪️</span>
            <div><strong>SQL Spaghetti:</strong> A tangled mess of interdependent SQL scripts with no clear order of execution, making debugging a nightmare.</div>
          </li>
          <li className="list-item-card">
            <span className="list-item-emoji">🧪</span>
            <div><strong>Lack of Testing:</strong> No easy or standardized way to test the quality of the data produced by transformations.</div>
          </li>
          <li className="list-item-card">
            <span className="list-item-emoji">📚</span>
            <div><strong>Poor Documentation:</strong> Critical knowledge often stored in someone's head, quickly becoming outdated.</div>
          </li>
          <li className="list-item-card">
            <span className="list-item-emoji">👯</span>
            <div><strong>Code Duplication:</strong> The same business logic rewritten in multiple places, leading to inconsistencies.</div>
          </li>
        </ul>

        <h3 className="chapter-subtitle">The Paradigm Shift: From ETL to ELT</h3>
        <p className="chapter-paragraph">To understand dbt's place in the world, we must first understand the shift from ETL to ELT.</p>
        <div className="card">
            <h4 className="card-title">Visualizing the Modern Data Workflow</h4>
            <div className="figure-container">
                <figure className="figure">
                    <img src={fig1} alt="The Modern Data Stack with dbt" className="figure-image" />
                    <figcaption className="figure-caption">
                        <strong>Figure 1:</strong> The Modern Data Stack. Extract & Load tools bring raw data into the warehouse, dbt transforms it, and BI tools consume the clean, modeled data.
                    </figcaption>
                </figure>
                <figure className="figure">
                    <img src={fig2} alt="How dbt_project.yml and profiles.yml connect" className="figure-image" />
                    <figcaption className="figure-caption">
                        <strong>Figure 2:</strong> Project Configuration. The `profile` key in `dbt_project.yml` links your project to the correct connection credentials in `profiles.yml`.
                    </figcaption>
                </figure>
            </div>
        </div>
      </div>
    )
  },
  {
    id: 2,
    title: "Chapter 2: Installation and Project Setup",
    content: () => (
      <div className="chapter-content">
        <h2 className="chapter-title">Installation and Project Setup</h2>
        <p className="chapter-paragraph">Before we can build anything, we need to lay the foundation. This chapter covers installing dbt, creating your first project, and connecting it to your data warehouse.</p>
        
        <h3 className="chapter-subtitle">Prerequisites: Your Toolkit</h3>
        <ul className="prerequisites-grid">
            <li className="prerequisites-item">🖥️ A Command Line Interface (CLI)</li>
            <li className="prerequisites-item">🐍 Python 3.8+</li>
            <li className="prerequisites-item">🌿 Git for version control</li>
            <li className="prerequisites-item">☁️ Access to a Cloud Data Warehouse</li>
        </ul>

        <h3 className="chapter-subtitle">Installation</h3>
        <p className="chapter-paragraph">We recommend installing dbt Core using `pipx` to avoid dependency conflicts. First, install pipx, then install dbt and the specific adapter for your warehouse.</p>
        <CodeBlock code={`# First, install pipx\npython3 -m pip install --user pipx\npython3 -m pipx ensurepath\n\n# Then, install dbt and the specific adapter\npipx install dbt-snowflake`} />
        <p className="note"><em>Note: Replace `dbt-snowflake` with `dbt-bigquery`, `dbt-redshift`, etc.</em></p>

        <h3 className="chapter-subtitle">Initializing Your First dbt Project</h3>
        <CodeBlock code={`dbt init my_first_dbt_project`} />

        <h3 className="chapter-subtitle">The Anatomy of a dbt Project</h3>
        <p className="chapter-paragraph">Your new project directory is the heart of your analytics work. Here are the key components:</p>
        <div className="card">
          <ul className="anatomy-list">
            <li><strong className="anatomy-item">dbt_project.yml:</strong> The main configuration file for your project.</li>
            <li><strong className="anatomy-item">profiles.yml:</strong> (Outside project) Contains your database connection credentials.</li>
            <li><strong className="anatomy-item">models/:</strong> This is where you'll write all your SQL models.</li>
            <li><strong className="anatomy-item">tests/:</strong> Contains custom data tests.</li>
            <li><strong className="anatomy-item">macros/:</strong> A place to store reusable Jinja macros.</li>
            <li><strong className="anatomy-item">seeds/:</strong> For loading small, static CSV files.</li>
            <li><strong className="anatomy-item">snapshots/:</strong> For tracking changes to data over time.</li>
          </ul>
        </div>
      </div>
    )
  },
    {
    id: 3,
    title: "Chapter 3: Foundational Concepts",
    content: () => (
      <div className="chapter-content">
        <h2 className="chapter-title">Foundational Concepts: Models, Sources, and Refs</h2>
        <p className="chapter-paragraph">With our project set up, it's time to transform data. This chapter introduces the absolute core building blocks of any dbt project.</p>
        
        <h3 className="chapter-subtitle">Sources: Declaring Your Raw Data</h3>
        <p className="chapter-paragraph">You can't transform data you haven't defined. <strong>Sources</strong> allow you to name and describe the raw tables loaded into your warehouse. This provides a clean interface between your raw data and your dbt project.</p>
        <CodeBlock language="yaml" code={`# models/staging/stg_sources.yml
version: 2

sources:
  - name: jaffle_shop
    description: "Raw data from the Jaffle Shop application database."
    database: raw
    schema: jaffle_shop_data
    tables:
      - name: customers
      - name: orders`} />

        <h3 className="chapter-subtitle">Models: The Heart of dbt</h3>
        <p className="chapter-paragraph">A model in dbt is simply a `SELECT` statement in a `.sql` file. The filename becomes the model name. This encourages the use of Common Table Expressions (CTEs), which makes SQL more readable.</p>
        <CodeBlock language="sql" code={`-- models/staging/stg_customers.sql
with source_data as (
    select id, first_name, last_name
    from {{ source('jaffle_shop', 'customers') }}
),

renamed as (
    select
        id as customer_id,
        first_name,
        last_name
    from source_data
)

select * from renamed`} />

        <h3 className="chapter-subtitle">Building Dependencies with `ref()` and `source()`</h3>
        <p className="chapter-paragraph">The `ref()` and `source()` functions are how you build your dependency graph (DAG). By using them, you give dbt the power to infer lineage and run models in the correct order.</p>
        <div className="card">
          <h4 className="card-title">Simple dbt DAG</h4>
          <div className="dag">
            <div className="dag-row">
              <div className="dag-node dag-node-source">
                <p>source</p>
                <p>customers</p>
              </div>
              <div className="dag-node dag-node-source">
                <p>source</p>
                <p>orders</p>
              </div>
            </div>
            <div className="dag-arrow">↓</div>
            <div className="dag-row">
              <div className="dag-node dag-node-model">
                <p>model</p>
                <p>stg_customers</p>
              </div>
              <div className="dag-node dag-node-model">
                <p>model</p>
                <p>stg_orders</p>
              </div>
            </div>
            <div className="dag-arrow">↓</div>
            <div className="dag-row">
                <div className="dag-node dag-node-mart">
                  <p>model</p>
                  <p>dim_customers</p>
                </div>
            </div>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 4,
    title: "Chapter 4: A Deep Dive into Materializations",
    content: () => (
      <div className="chapter-content">
        <h2 className="chapter-title">A Deep Dive into Materializations</h2>
        <p className="chapter-paragraph">A <strong>materialization</strong> is the strategy dbt uses to build a model in your warehouse. Choosing the right one is crucial for performance and cost.</p>
        <div className="table-container">
          <table className="styled-table">
            <thead>
              <tr>
                <th>Materialization</th>
                <th>Description</th>
                <th>When to Use</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>view (default)</td>
                <td>A database view. The query runs every time it's accessed.</td>
                <td>Staging models, when data freshness is critical.</td>
              </tr>
              <tr>
                <td>table</td>
                <td>A physical table. The query runs once during `dbt run`.</td>
                <td>Final data marts, complex models queried by BI tools.</td>
              </tr>
              <tr>
                <td>incremental</td>
                <td>A hybrid. Builds a table, then only updates new/changed records.</td>
                <td>Very large event or log tables where full rebuilds are too slow.</td>
              </tr>
              <tr>
                <td>ephemeral</td>
                <td>Injects SQL as a CTE in downstream models. Not built in the DB.</td>
                <td>Lightweight, intermediate steps not queried directly.</td>
              </tr>
            </tbody>
          </table>
        </div>
        <h3 className="chapter-subtitle">The Incremental Materialization in Detail</h3>
        <p className="chapter-paragraph">Incremental models are powerful but require more configuration. You need to tell dbt how to filter for "new" records using the `is_incremental()` macro.</p>
        <CodeBlock language="sql" code={`{{
  config(
    materialized='incremental',
    unique_key='order_id'
  )
}}

select * from raw_orders

{% if is_incremental() %}
  -- this filter will only be applied on incremental runs
  where order_date > (select max(order_date) from {{ this }})
{% endif %}`} />
      </div>
    )
  },
    {
    id: 5,
    title: "Chapter 5: Ensuring Data Quality with Testing",
    content: () => (
      <div className="chapter-content">
        <h2 className="chapter-title">Ensuring Data Quality with Testing</h2>
        <p className="chapter-paragraph">A model is only as good as the data it produces. In dbt, testing is a first-class citizen, allowing you to make assertions about your data to ensure its quality and reliability.</p>

        <h3 className="chapter-subtitle">Generic Tests: Your First Line of Defense</h3>
        <p className="chapter-paragraph">dbt comes with four built-in generic tests you can add to any column in a `.yml` file:</p>
        <ul className="chapter-list-disc">
          <li><strong>unique:</strong> Asserts all values in a column are unique.</li>
          <li><strong>not_null:</strong> Asserts no `NULL` values exist.</li>
          <li><strong>accepted_values:</strong> Asserts all values are within a specified list.</li>
          <li><strong>relationships:</strong> Asserts referential integrity.</li>
        </ul>
        <CodeBlock language="yaml" code={`# In a model's .yml file
models:
  - name: dim_customers
    columns:
      - name: customer_id
        tests:
          - unique
          - not_null
      - name: status
        tests:
          - accepted_values:
              values: ['active', 'inactive']`} />

        <h3 className="chapter-subtitle">Singular Tests: Custom Business Logic</h3>
        <p className="chapter-paragraph">For more complex validation, a <strong>singular test</strong> is a SQL query in a `.sql` file that is expected to return <strong>zero</strong> rows for the test to pass.</p>
        <CodeBlock language="sql" code={`-- tests/assert_positive_order_total.sql
-- This test will fail if any order has a negative total amount.
select
    order_id,
    sum(amount) as total_amount
from {{ ref('stg_payments') }}
group by 1
having not(total_amount >= 0)`} />
      </div>
    )
  },
  {
    id: 6,
    title: "Chapter 6: Documentation and Data Governance",
    content: () => (
      <div className="chapter-content">
        <h2 className="chapter-title">Documentation and Data Governance</h2>
        <p className="chapter-paragraph">Good documentation turns a collection of scripts into a maintainable, scalable analytics asset.</p>

        <h3 className="chapter-subtitle">Documenting Your Work</h3>
        <p className="chapter-paragraph">In dbt, you add documentation directly into the same `.yml` files you use for testing. You can use multi-line markdown for rich descriptions.</p>
        <CodeBlock language="yaml" code={`models:
  - name: dim_customers
    description: >
      This table contains one record per customer. It includes
      summary statistics about their order history and is intended
      for use in our marketing analytics dashboards.
    columns:
      - name: customer_id
        description: "This is the unique key for a customer."`} />

        <h3 className="chapter-subtitle">Generating Your dbt Documentation Site</h3>
        <p className="chapter-paragraph">This is one of dbt's killer features. dbt generates a fully interactive documentation website from your project.</p>
        <CodeBlock code={`# Generate the documentation artifacts
dbt docs generate

# Serve the site on a local webserver
dbt docs serve`} />
        
        <h3 className="chapter-subtitle">Data Governance with `meta` and `tags`</h3>
        <p className="chapter-paragraph">You can add metadata to your models for better governance. This allows you to classify models, assign ownership, and run specific subsets of your project.</p>
        <CodeBlock language="yaml" code={`models:
  - name: dim_customers
    description: "Customer dimension table."
    meta:
      owner: "@jane_analyst"
      pii: true
    tags: ['marketing', 'daily']`} />
        <p className="chapter-paragraph">You can then run models based on their tags: `dbt run --select tag:marketing`.</p>
      </div>
    )
  },
  {
    id: 7,
    title: "Chapter 7: Advanced Modeling with Jinja & Macros",
    content: () => (
      <div className="chapter-content">
        <h2 className="chapter-title">Advanced Modeling with Jinja and Macros</h2>
        <p className="chapter-paragraph">dbt's real power comes from its use of the <strong>Jinja</strong> templating engine, which lets you embed programming logic directly into your SQL.</p>

        <h3 className="chapter-subtitle">Supercharging SQL with Jinja</h3>
        <p className="chapter-paragraph">You can use control structures like `if` statements to change a query's logic based on the environment.</p>
        <CodeBlock language="sql" code={`select * from {{ ref('very_large_table') }}

{% if target.name == 'dev' %}
  -- This WHERE clause only runs in the 'dev' environment
  where event_timestamp >= dateadd('day', -7, current_timestamp)
{% endif %}`} />

        <h3 className="chapter-subtitle">Macros: Creating Reusable SQL Functions</h3>
        <p className="chapter-paragraph">A macro is a reusable piece of Jinja and SQL code, like a function. Define it once in the `macros/` directory and call it from any model to keep your code DRY (Don't Repeat Yourself).</p>
        <CodeBlock language="sql" code={`-- macros/pricing.sql
{% macro cents_to_dollars(column_name, precision=2) %}
    ({{ column_name }} / 100)::numeric(16, {{ precision }})
{% endmacro %}`} />
        <p className="chapter-paragraph">Now you can use it in a model:</p>
        <CodeBlock language="sql" code={`select
    order_id,
    {{ cents_to_dollars('amount_in_cents') }} as amount_usd
from {{ ref('stg_payments') }}`} />
      </div>
    )
  },
  {
    id: 8,
    title: "Chapter 8: Advanced dbt Features",
    content: () => (
      <div className="chapter-content">
        <h2 className="chapter-title">Advanced dbt Features: Seeds and Snapshots</h2>
        
        <h3 className="chapter-subtitle">Seeds: Managing Static Data</h3>
        <p className="chapter-paragraph"><strong>Seeds</strong> are CSV files in your dbt project that dbt can load into your data warehouse. This is useful for small, static datasets that change infrequently, like a list of country codes or a mapping of employee IDs to names.</p>
        <p className="chapter-paragraph">Place a CSV file in your `seeds/` directory, for example `country_codes.csv`, and run:</p>
        <CodeBlock code={`dbt seed`} />
        <p className="chapter-paragraph">You can then <code className="inline-code">ref()</code> your seed in a model just like any other table: <code className="inline-code">{`{{ ref('country_codes') }}`}</code>.</p>

        <h3 className="chapter-subtitle">Snapshots: Tracking Changes Over Time</h3>
        <p className="chapter-paragraph"><strong>Snapshots</strong> allow you to capture changes to a mutable table over time, creating a Type 2 Slowly Changing Dimension. This is useful for tracking things like changes to a customer's address or a product's price.</p>
        <CodeBlock language="sql" code={`-- snapshots/customers_snapshot.sql
{% snapshot customers_snapshot %}
{{
    config(
      target_schema='snapshots',
      unique_key='customer_id',
      strategy='check',
      check_cols=['address', 'city', 'state', 'zip_code'],
    )
}}
select * from {{ source('jaffle_shop', 'customers') }}
{% endsnapshot %}`} />
        <p className="chapter-paragraph">When you run `dbt snapshot`, dbt will create a table that includes `dbt_valid_from` and `dbt_valid_to` columns, allowing you to see what a customer's record looked like at any point in time.</p>
      </div>
    )
  },
  {
    id: 9,
    title: "Chapter 9: Structuring and Scaling Your Project",
    content: () => (
      <div className="chapter-content">
        <h2 className="chapter-title">Structuring and Scaling Your dbt Project</h2>
        <p className="chapter-paragraph">A small dbt project is easy to manage. A large one with hundreds or thousands of models can become a tangled mess without a clear structure and conventions.</p>

        <h3 className="chapter-subtitle">Recommended Project Structure: Staging, Intermediate, Marts</h3>
        <p className="chapter-paragraph">A widely adopted best practice is to structure your `models` directory into layers that represent the flow of data from raw to analysis-ready.</p>
        <div className="card">
          <ul className="chapter-list-disc">
            <li><strong>Staging:</strong> The first layer. Models here should have a 1:1 relationship with source tables. Responsibilities: renaming, type casting, very light cleaning. No joins.</li>
            <li><strong>Intermediate:</strong> An optional layer for complex transformations that are reused in multiple downstream models. This helps keep your final marts models clean and focused.</li>
            <li><strong>Marts:</strong> The final layer. These are the models that are exposed to end-users and BI tools. They are often denormalized and focused on a specific business process (e.g., finance, marketing). They join together different staging models.</li>
          </ul>
        </div>

        <h3 className="chapter-subtitle">Style Guide and Naming Conventions</h3>
        <p className="chapter-paragraph">Consistency is key. A clear style guide ensures that anyone can understand the purpose of a model just by its name.</p>
        <div className="table-container">
          <table className="styled-table">
            <thead>
              <tr>
                <th>Layer</th>
                <th>Prefix</th>
                <th>Example</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>Staging</td><td>stg_</td><td>stg_jaffle_shop__customers</td></tr>
              <tr><td>Intermediate</td><td>int_</td><td>int_payments_pivoted</td></tr>
              <tr><td>Marts (Fact)</td><td>fct_</td><td>fct_orders</td></tr>
              <tr><td>Marts (Dim)</td><td>dim_</td><td>dim_customers</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    )
  },
  {
    id: 10,
    title: "Chapter 10: Deploying dbt",
    content: () => (
      <div className="chapter-content">
        <h2 className="chapter-title">Deploying dbt: Production, CI/CD, and Monitoring</h2>
        <p className="chapter-paragraph">The real value comes from running dbt on a schedule in a production environment.</p>

        <h3 className="chapter-subtitle">Environments: Development vs. Production</h3>
        <p className="chapter-paragraph">Your `profiles.yml` can handle multiple environments. A `dev` target points to your personal schema for development, while a `prod` target points to the clean, final schema used by BI tools.</p>
        <CodeBlock code={`# Run against the dev environment (default)
dbt run

# Run against the prod environment
dbt run --target prod`} />

        <h3 className="chapter-subtitle">Introduction to CI/CD</h3>
        <p className="chapter-paragraph"><strong>Continuous Integration / Continuous Deployment (CI/CD)</strong> automates testing and deployment. For dbt, this means:</p>
        <ul className="chapter-list-disc">
          <li><strong>CI (Continuous Integration):</strong> Whenever a developer opens a Pull Request, an automated job runs `dbt run` and `dbt test` on a temporary schema to ensure the changes don't break anything.</li>
          <li><strong>CD (Continuous Deployment):</strong> When the Pull Request is merged into the main branch, an automated job runs the project against the production environment.</li>
        </ul>
        
        <h3 className="chapter-subtitle">Monitoring and Alerting</h3>
        <p className="chapter-paragraph">It's crucial to know when a production run fails. <strong>dbt Cloud</strong> has built-in alerting via email or Slack. For <strong>dbt Core</strong>, you can use workflow orchestrators like Airflow or Prefect, which have their own alerting mechanisms, or integrate dbt with observability platforms to monitor performance and data quality over time.</p>
      </div>
    )
  },
];

// Reusable CodeBlock component
const CodeBlock = ({ code, language = 'bash' }) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="code-block">
      <pre><code>{code}</code></pre>
      <button 
        onClick={handleCopy}
        className="copy-button"
      >
        {copied ? 'Copied!' : 'Copy'}
      </button>
    </div>
  );
};

// Sidebar component
const Sidebar = ({ chapters, activeChapter, onChapterSelect, isOpen }) => {
  return (
    <aside className={`sidebar ${isOpen ? 'sidebar-open' : ''}`}>
      <h1 className="sidebar-title">The Ultimate dbt Guide</h1>
      <nav>
        <ul>
          {chapters.map((chapter) => (
            <li key={chapter.id}>
              <a
                href={`#chapter-${chapter.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  onChapterSelect(chapter.id);
                }}
                className={`sidebar-link ${activeChapter === chapter.id ? 'sidebar-link-active' : ''}`}
              >
                {chapter.title}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

// Main App component
function App() {
  const [activeChapter, setActiveChapter] = React.useState(1);
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
  const [isFading, setIsFading] = React.useState(false);

  const handleChapterSelect = (id) => {
    if (id === activeChapter) {
        setIsSidebarOpen(false);
        return;
    }
    setIsFading(true);
    setTimeout(() => {
      setActiveChapter(id);
      setIsFading(false);
      setIsSidebarOpen(false); // Close sidebar on mobile after selection
      window.scrollTo(0, 0); // Scroll to top of new chapter
    }, 200);
  };

  const ActiveChapterContent = tutorialData.find(c => c.id === activeChapter)?.content;

  return (
    <div className="app-container">
      
      {isSidebarOpen && <div className="mobile-overlay" onClick={() => setIsSidebarOpen(false)}></div>}
      
      <Sidebar 
        chapters={tutorialData} 
        activeChapter={activeChapter} 
        onChapterSelect={handleChapterSelect}
        isOpen={isSidebarOpen}
      />
      
      <button 
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="mobile-menu-button"
        aria-label="Open menu"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="menu-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      <main className="main-content" style={{ opacity: isFading ? 0 : 1 }}>
        <div className="content-wrapper">
          {ActiveChapterContent && <ActiveChapterContent />}
        </div>
      </main>
    </div>
  );
}

export default App;
