from flask import Flask, render_template
import plotly.express as px
import plotly.io as pio
import pandas as pd

app = Flask(__name__)


df = pd.read_csv("healthcare_dataset.csv")
Info = ["Age","Gender","Blood Type", "Medical Condition", "Medication", "Test Results"]
Cdf = df.loc[:, Info]


fig = px.scatter(Cdf, y='Test Results', x='Medication', title='Medical Data Comparison')

fig.update_layout(
    margin=dict(l=300, r=300, t=100, b=50),
    paper_bgcolor= '#363636',
    plot_bgcolor='#363636',
    font=dict(family='Segoe UI', size=15, color='#dddddd'),
    xaxis=dict(
        showgrid=True,
        gridcolor='#787878'
    ),
    yaxis=dict(
        showgrid=True,
        gridcolor='#787878'
    )
) 

fig.update_traces(
    marker=dict(
        size=20,
        color='#00A72F',
    )
)

chart_html = pio.to_html(fig, full_html=False)

@app.route('/')
def index():
    return render_template('index.html', chart_html=chart_html)

if __name__ == '__main__':
    app.run(debug=True)