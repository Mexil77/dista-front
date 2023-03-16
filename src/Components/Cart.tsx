import "../Styles/Cart.scss";

export default function Cart() {
	return (
		<div className="Cart">
			<div className="Cart_Header">
				<h1>Cart</h1>
			</div>
			<div className="Cart_Body">
				<div className="Cart_Body_Products">
					<div className="Cart_Body_Products_Product">
						<p>Nombre</p>
						<p>Descripcion</p>
						<p>Cantidad/Precio</p>
						<div className="Cart_Body_Products_Product_checkbox">
							<div className="checkbox">
								<label>Descartado</label>
								<input type="checkbox" name="encontrado" id="1" />
							</div>
							<div className="checkbox">
								<label>Encontrado</label>
								<input type="checkbox" name="noEncontrado" id="2" />
							</div>
						</div>
					</div>
					<div className="Cart_Body_Products_Product">
						<p>Nombre</p>
						<p>Descripcion</p>
						<p>Cantidad/Precio</p>
						<div className="Cart_Body_Products_Product_checkbox">
							<div className="checkbox">
								<label>Descartado</label>
								<input type="checkbox" name="encontrado" id="1" />
							</div>
							<div className="checkbox">
								<label>Encontrado</label>
								<input type="checkbox" name="noEncontrado" id="2" />
							</div>
						</div>
					</div>
				</div>
				<div className="Cart_Body_Totals">
					<p>$10.52</p>
					<button>ticket</button>
				</div>
			</div>
		</div>
	);
}
